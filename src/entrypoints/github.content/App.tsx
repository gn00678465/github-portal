import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DeepWikiIcon from './DeepWiki'
import GitIngestIcon from './GitIngest'

function App() {
  function onSelect(method: 'deepwiki' | 'gitingest') {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-[28px] text-sm p-[3px_12px]" variant="outline">
          <ExternalLink />
          {browser.i18n.getMessage('trigger')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => onSelect('deepwiki')}>
            <DeepWikiIcon />
            {browser.i18n.getMessage('open_in_deepwiki')}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => onSelect('gitingest')}>
            <GitIngestIcon />
            {browser.i18n.getMessage('open_in_gitingest')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default App
