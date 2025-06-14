import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DndProviderWrapper from './dnd/DndProviderWrapper.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
    The drag and drop capabaility can only be added if the App is wrapped
    around react's drag and drop and HTML drag and drop components.
    */}
    <DndProviderWrapper>
      <App />
    </DndProviderWrapper>
  </StrictMode>,
)
