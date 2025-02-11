import React from 'react'
import reactDom from 'react-dom/client'
import { App } from './App.jsx'
import './styles/App.css'

const root = reactDom.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
