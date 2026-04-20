import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import './App.css'
import { AuthProvider } from './context/AuthContext'
import { NotifierProvider } from './context/NotifierContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <NotifierProvider>
        <App />
      </NotifierProvider>
    </AuthProvider>
  </StrictMode>,
)
