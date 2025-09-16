import { Button } from '@/components/ui/button'
import DeepWikiIcon from './DeepWiki'
import GitIngestIcon from './GitIngest'

function App() {
  function onClick(method: 'deepwiki' | 'gitingest') {
    switch (method) {
      case 'deepwiki':
        browser.runtime.sendMessage({ action: 'redirect:deepwiki', url: window.location.href })
          .then((response) => {
            window.location.href = response.url
          })
        break
      case 'gitingest':
        browser.runtime.sendMessage({ action: 'redirect:gitingest', url: window.location.href })
          .then((response) => {
            window.location.href = response.url
          })
        break
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button className="h-[28px] text-xs p-[3px_12px] cursor-pointer" variant="outline" onClick={() => onClick('deepwiki')}>
        <DeepWikiIcon />
        {browser.i18n.getMessage('open_in_deepwiki')}
      </Button>

      <Button className="h-[28px] text-xs p-[3px_12px] cursor-pointer" variant="outline" onClick={() => onClick('gitingest')}>
        <GitIngestIcon />
        {browser.i18n.getMessage('open_in_gitingest')}
      </Button>
    </div>
  )
}

export default App
