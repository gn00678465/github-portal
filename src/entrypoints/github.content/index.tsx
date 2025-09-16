import ReactDOM from 'react-dom/client'
import App from './App'
import '../style.css'

const Index = defineContentScript({
  matches: ['*://*.github.com/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'github-portal',
      position: 'inline',
      anchor: '#repository-details-container',
      append: 'before',
      onMount(container) {
        container.style.background = 'transparent'
        container.style.backgroundColor = 'transparent'

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        // 在 Shadow DOM 根元素設置黑暗模式
        if (darkModeMediaQuery.matches) {
          container.classList.add('dark')
        }

        darkModeMediaQuery.addEventListener('change', (e) => {
          const darkModeOn = e.matches
          if (darkModeOn) {
            container.classList.add('dark')
          }
          else {
            container.classList.remove('dark')
          }
        })

        const wrapper = document.createElement('div')
        wrapper.id = 'root'
        container.append(wrapper)

        const root = ReactDOM.createRoot(wrapper)
        root.render(<App />)

        return { root, wrapper }
      },
      onRemove: (elements) => {
        elements?.root.unmount()
        elements?.wrapper.remove()
      },
    })

    ui.mount()
  },
})

export default Index
