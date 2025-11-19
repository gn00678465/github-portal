type Message = {
  action: 'redirect:deepwiki'
  url: string
} | {
  action: 'redirect:gitingest'
  url: string
} | {
  action: 'redirect:codewiki'
  url: string
}

interface Response {
  url: string
}

type SendResponse = (response: Response) => void

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message: Message, sender, sendResponse: SendResponse) => {
    switch (message.action) {
      case 'redirect:deepwiki': {
        const newUrl = message.url.replace('github.com', 'deepwiki.com')
        sendResponse({ url: newUrl })
        break
      }
      case 'redirect:gitingest': {
        const newUrl = message.url.replace('github.com', 'gitingest.com')
        sendResponse({ url: newUrl })
        break
      }
      case 'redirect:codewiki': {
        const newUrl = message.url.replace('github.com', 'codewiki.google/github.com')
        sendResponse({ url: newUrl })
        break
      }
    }

    return true
  })

  // 檢測可用的 API
  const actionAPI = browser.action || browser.browserAction

  if (actionAPI.onClicked) {
    actionAPI.onClicked.addListener((tab) => {
      if (tab.url?.includes('newtab') || tab.url?.includes('blank')) {
        browser.tabs.update(tab.id, { url: 'https://github.com' })
      }
    })
  }
})
