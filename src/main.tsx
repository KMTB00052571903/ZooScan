import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './components/Header';
import './components/ScannerView';
import './components/ResultsCard';
import './components/MapView';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
