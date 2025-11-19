import { Button } from '@/components/ui/button'
import CodeWikiIcon from './CodeWiki'
import DeepWikiIcon from './DeepWiki'
import GitIngestIcon from './GitIngest'

function App() {
  function onClick(method: 'deepwiki' | 'gitingest' | 'codewiki') {
    switch (method) {
      case 'codewiki':
        browser.runtime.sendMessage({ action: 'redirect:codewiki', url: window.location.href })
          .then((response) => {
            window.location.href = response.url
          })
        break
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
      <Button className="h-[28px] text-xs p-[3px_12px] cursor-pointer px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" variant="outline" onClick={() => onClick('codewiki')}>
        <CodeWikiIcon className="h-4 w-max text-black" style={{ width: 'max-content' }} />
      </Button>

      <Button className="h-[28px] text-xs p-[3px_12px] cursor-pointer px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" variant="outline" onClick={() => onClick('deepwiki')}>
        <DeepWikiIcon />
        {browser.i18n.getMessage('open_in_deepwiki')}
      </Button>

      <Button className="h-[28px] text-xs p-[3px_12px] cursor-pointer px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200" variant="outline" onClick={() => onClick('gitingest')}>
        <GitIngestIcon />
        {browser.i18n.getMessage('open_in_gitingest')}
      </Button>
    </div>
  )
}

export default App
