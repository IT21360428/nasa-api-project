import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './marsApp.jsx'
import '../assets/css/marsStyle.css'

ReactDOM.createRoot(document.getElementById('mars-root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
