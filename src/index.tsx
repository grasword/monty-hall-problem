import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
// @ts-expect-error it's just a style
import './styles/App.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
