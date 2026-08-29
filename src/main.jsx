import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthModal from './AuthModal.jsx'
createRoot(document.getElementById('root')).render(
  <AuthModal> <App /></AuthModal>
   
);