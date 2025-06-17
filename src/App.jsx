import './App.css';
import { useState, useCallback, useRef } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';

import SidePanel from './components/SidePanel';
import Canvas from './components/Canvas';

function App() {
  const sensors = useSensors(useSensor(PointerSensor));
  const [windows, setWindows] = useState([]);
  const canvasRef = useRef(null);
  const GRID_SIZE = 20;

  const handleDragEnd = useCallback((event) => {
    const { active, delta } = event;
    if (!active || !canvasRef.current) return;
  
    const id = active.id;
  
    const canvasRect = canvasRef.current.getBoundingClientRect();
  
    const windowWidth = 300;
    const windowHeight = 200;
  
    setWindows(prev => {
      const draggedWindow = prev.find(w => w.id === id);
      if (!draggedWindow) return prev;
  
      const startX = draggedWindow.position.x;
      const startY = draggedWindow.position.y;
  
      let newX = startX + delta.x;
      let newY = startY + delta.y;
  
      const maxX = canvasRect.width - windowWidth;
      const maxY = canvasRect.height - windowHeight;
  
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
  
      return prev.map(w =>
        w.id === id ? { ...w, position: { x: newX, y: newY } } : w
      );
    });
  }, []);

  const handleCloseWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const handleNewWindow = useCallback(() => {
    const newWindow = {
      id: crypto.randomUUID(),
      type: 'floating-window',
      position: { x: 100, y: 100 } // default spawn position
    };
    setWindows(prev => [...prev, newWindow]);
  }, []);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
