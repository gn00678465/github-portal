type Message = {
  action: 'redirect:deepwiki'
  url: string
} | {
  action: 'redirect:gitingest'
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
    }

    return true
  })
})
