import ReactDOM from 'react-dom/client'
import App from './App'
import '../style.css'

const Index = defineContentScript({
  matches: ['*://*.github.com/*'],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: '#repository-details-container > ul',
      append: 'first',
      tag: 'li',
      onMount(container) {
        const root = ReactDOM.createRoot(container)
        root.render(<App />)
        return root
      },
    })

    ui.autoMount()
  },
})

export default Index
