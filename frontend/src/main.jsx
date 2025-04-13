import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import AnalyticsProvider from './context/AnalyticsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnalyticsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AnalyticsProvider>
  </StrictMode>,
)
