# GitHub 傳送門 🚀

一款瀏覽器擴充功能，讓你在 GitHub 專案頁面中快速開啟 DeepWiki 或 GitIngest。

## ✨ 功能特色

- 🔗 **一鍵跳轉**：在 GitHub 專案頁面直接跳轉到 DeepWiki 或 GitIngest
- 🎯 **智慧辨識**：自動辨識當前 GitHub 專案並產生對應連結
- 🌐 **多語言支援**：支援繁體中文和英文介面
- 📱 **現代化 UI**：採用 Radix UI 和 Tailwind CSS 打造的美觀介面

## 🛠️ 技術架構

- **框架**：WXT (Web Extension Tools)
- **前端**：React 19 + TypeScript
- **UI 元件**：Radix UI
- **樣式**：Tailwind CSS
- **建構工具**：Vite
- **程式碼品質**：ESLint

## 📦 專案結構

```
github-portal/
├── src/
│   ├── entrypoints/           # 擴充功能入口點
│   │   ├── background.ts      # 背景腳本
│   │   └── github.content/    # 內容腳本
│   │       ├── App.tsx        # 主要應用元件
│   │       ├── DeepWiki.tsx   # DeepWiki 圖示元件
│   │       ├── GitIngest.tsx  # GitIngest 圖示元件
│   │       └── index.tsx      # 內容腳本入口
│   ├── components/ui/         # UI 元件庫
│   └── utils/                 # 工具函式
├── public/
│   ├── _locales/             # 國際化資源
│   └── icon/                 # 擴充功能圖示
└── package.json
```

## 🚀 開發指南

### 環境需求

- Node.js 18+
- pnpm 9+

### 安裝相依套件

```bash
pnpm install
```

### 開發模式

```bash
# Chrome/Edge 開發
pnpm dev

# Firefox 開發
pnpm dev:firefox

# Edge 專用開發
pnpm dev:edge
```

### 建構專案

```bash
# 建構所有瀏覽器版本
pnpm build

# 建構 Firefox 版本
pnpm build:firefox
```

### 打包發布

```bash
# 打包 Chrome/Edge 版本
pnpm zip

# 打包 Firefox 版本
pnpm zip:firefox
```

### 程式碼檢查

```bash
# 執行 ESLint 檢查
pnpm lint

# 自動修復程式碼風格問題
pnpm lint:fix

# TypeScript 型別檢查
pnpm compile
```

### Firefox 簽名
```bash
pnpm tsx scripts/sign.ts --api-key <AMO_API_ISSUER> --api-secret <AMO_API_SECRET>
```

## 🎯 使用方式

1. 在瀏覽器中安裝擴充功能
2. 瀏覽任意 GitHub 專案頁面
3. 在專案詳情區域會出現「使用以下方式開啟...」按鈕
4. 點擊按鈕選擇：
   - **在 DeepWiki 中開啟**：適合深度分析程式碼結構
   - **在 GitIngest 中開啟**：適合快速瀏覽程式碼內容

## 🌐 國際化支援

專案支援多語言，目前提供：
- 🇹🇼 繁體中文（預設）
- 🇺🇸 English

語言檔案位於 `public/_locales/` 目錄。

## 📋 權限說明

擴充功能僅請求以下權限：
- `host_permissions`: `*://*.github.com/*` - 僅在 GitHub 網站運作

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m '新增了很棒的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權條款

此專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案。

## 🔗 相關連結

- [DeepWiki](https://deepwiki.com) - AI 驅動的程式碼分析平台
- [GitIngest](https://gitingest.com) - 快速瀏覽程式碼的工具
- [WXT Framework](https://wxt.dev) - 現代化的 Web 擴充功能開發框架
