import { useState } from 'react'
import { Button } from '@/components/ui/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-64 p-4 flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-xl font-bold">{browser.i18n.getMessage('extName')}</h1>
      <Button className="" onClick={() => setCount(count => count + 1)}>
        count is
        {' '}
        {count}
      </Button>
    </div>
  )
}

export default App
