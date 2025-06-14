import './App.css'
import SidePanel from './components/SidePanel'
import Canvas from './components/Canvas'

function App() {
  return (
    <div className="app-container">
      {/*
      This div with className app-container, is used to split the webpage
      into 3 sections basically. The side panel which is on the left hand
      side a vertical border separating the side panel and another called
      the canvas.
      */}

      {/* Side Panel Section */}
      <SidePanel />

      {/* Divider Section */}
      <div className="divider" />

      {/* Canvas Section */}
      <Canvas />
    </div>
  )
}

export default App
