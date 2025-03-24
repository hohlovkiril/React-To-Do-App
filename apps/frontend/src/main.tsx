import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(<div style={{ display: 'flex', flexDirection: 'column', gap: '1em'}}>
  <App />
</div>)
