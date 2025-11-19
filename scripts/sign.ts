#!/usr/bin/env tsx

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

interface SignOptions {
  source?: string
  artifacts?: string
  apiKey?: string
  apiSecret?: string
  channel?: 'listed' | 'unlisted'
  id?: string
  timeout?: number
}

const argv = yargs(hideBin(process.argv))
  .options({
    'source': {
      alias: 's',
      type: 'string',
      description: '擴展源碼目錄',
      default: '.output/firefox-mv2', // WXT 的 Firefox 輸出目錄
    },
    'artifacts': {
      alias: 'a',
      type: 'string',
      description: '輸出目錄',
      default: './web-ext-artifacts',
    },
    'api-key': {
      type: 'string',
      description: 'AMO API Key',
      demandOption: true,
    },
    'api-secret': {
      type: 'string',
      description: 'AMO API Secret',
      demandOption: true,
    },
    'channel': {
      type: 'string',
      choices: ['listed', 'unlisted'] as const,
      default: 'unlisted' as const,
      description: '發布通道',
    },
    'timeout': {
      type: 'number',
      default: 900000, // 15 分鐘
      description: '簽名超時時間 (毫秒)',
    },
  })
  .help()
  .parseSync() as SignOptions & { 'api-key'?: string, 'api-secret'?: string }

async function signExtension(options: SignOptions) {
  console.log('🔐 開始簽名 Firefox 擴展...')

  // 檢查源碼目錄是否存在
  if (!fs.existsSync(options.source!)) {
    console.error(`❌ 源碼目錄不存在: ${options.source}`)
    console.log('💡 請先運行 "pnpm build:firefox" 來編譯擴展')
    process.exit(1)
  }

  // 構建 web-ext 命令
  const webExtCmd = [
    'pnpm web-ext sign',
    `--source-dir=${path.resolve(options.source!)}`,
    `--artifacts-dir=${path.resolve(options.artifacts!)}`,
    `--api-key=${argv['api-key']}`,
    `--api-secret=${argv['api-secret']}`,
    `--channel=${options.channel!}`,
    `--timeout=${options.timeout!}`,
  ]

  // 過濾掉未定義的選項
  const filteredCmd = webExtCmd.filter(part => !part.endsWith('=undefined')).join(' ')

  return new Promise<void>((resolve, reject) => {
    const child = spawn(filteredCmd, {
      shell: true,
      stdio: 'inherit',
    })

    // 設置超時
    const timeoutId = setTimeout(() => {
      console.log(`⏰ 簽名超時 (${options.timeout}ms)，正在終止進程...`)
      child.kill('SIGTERM')
      reject(new Error('簽名過程超時'))
    }, options.timeout)

    child.on('close', (code) => {
      clearTimeout(timeoutId)

      if (code === 0) {
        console.log('✅ 擴展簽名成功！')
        console.log(`📦 簽名檔案位置: ${path.resolve(options.artifacts!)}`)

        // 列出生成的檔案
        try {
          const files = fs.readdirSync(options.artifacts!)
          const xpiFiles = files.filter(file => file.endsWith('.xpi'))
          if (xpiFiles.length > 0) {
            console.log('📋 生成的 XPI 檔案:')
            xpiFiles.forEach((file) => {
              console.log(`   • ${file}`)
            })
          }
        }
        catch (error) {
          console.warn('⚠️  無法列出輸出檔案:', error)
        }

        resolve()
      }
      else {
        reject(new Error(`web-ext sign 失敗，退出碼: ${code}`))
      }
    })

    child.on('error', (error) => {
      clearTimeout(timeoutId)
      console.error('❌ 執行 web-ext 時發生錯誤:', error)
      reject(error)
    })

    // 處理進程終止信號
    process.on('SIGINT', () => {
      console.log('\n🛑 收到中斷信號，正在終止簽名進程...')
      child.kill('SIGTERM')
    })

    process.on('SIGTERM', () => {
      console.log('\n🛑 收到終止信號，正在終止簽名進程...')
      child.kill('SIGTERM')
    })
  })
}

// 執行簽名
signExtension(argv).catch((error) => {
  console.error('❌ 簽名失敗:', error.message)
  process.exit(1)
})
