import './App.css'
import SidePanel from './components/SidePanel'
import Canvas from './components/Canvas'

function App() {
  return (
    <div className="app-container">
      <aside className="side-panel">
        <SidePanel />
      </aside>

      <div className="divider" />

      <main className="canvas-area">
        <Canvas />
      </main>
    </div>
  )
}

export default App
