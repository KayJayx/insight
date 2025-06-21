import './App.css';
import { useState, useCallback, useRef } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import SidePanel from './components/SidePanel';
import Canvas from './components/Canvas';

function App() {
  const sensors = useSensors(useSensor(PointerSensor));
  const [windows, setWindows] = useState([]);
  const canvasRef = useRef(null);
  const dragStateRef = useRef(null);
  const windowWidth = 300;
  const windowHeight = 200;

  const handleDragEnd = useCallback(() => {
    dragStateRef.current = null;
  }, []);

  const handleDragMove = useCallback((event) => {
    const { delta } = event;
    const dragState = dragStateRef.current;
    if (!dragState || !canvasRef.current) return;

    let newX = dragState.origin.x + delta.x;
    let newY = dragState.origin.y + delta.y;

    const canvasRect = canvasRef.current.getBoundingClientRect();
  
    const boundaryX = canvasRect.width - dragState.size.width;
    const boundaryY = canvasRect.height - dragState.size.height;
  
    newX = Math.max(0, Math.min(newX, boundaryX));
    newY = Math.max(0, Math.min(newY, boundaryY));

    setWindows(prev =>
      prev.map(w =>
        w.id === dragState.id ? { ...w, position: { x: newX, y: newY } } : w
      )
    );
  }, []);

  const handleDragStart = useCallback((event) => {
    const { id } = event.active;
    const win = windows.find(w => w.id === id);
    if (win) {
      dragStateRef.current = {
        id,
        origin: { x: win.position.x, y: win.position.y }
      };
    }
  }, [windows]);

  const handleCloseWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const handleNewWindow = useCallback(() => {
    const newWindow = {
      id: crypto.randomUUID(),
      type: 'floating-window',
      position: { x: 0, y: 0 },
      size: { width: windowWidth, height: windowHeight }
    };
    setWindows(prev => [...prev, newWindow]);
  }, []);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
      <div className="app-container">
        <SidePanel onAddWindow={handleNewWindow}/>
        <div className="divider" />
        <Canvas
          innerRef={canvasRef}
          windows={windows}
          onClose={handleCloseWindow}
        />
      </div>
    </DndContext>
  );
}

export default App
