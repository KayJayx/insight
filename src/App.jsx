import './App.css';
import { useState, useCallback } from 'react';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core';

import SidePanel from './components/SidePanel';
import Canvas from './components/Canvas';

function App() {
  const sensors = useSensors(useSensor(PointerSensor));
  const [windows, setWindows] = useState([]);

  const handleDragEnd = useCallback((event) => {

    const { over, active, activatorEvent} = event;
    if (!over || over.id !== 'canvas-dropzone') return;

    console.log("event" + event);
    console.log("activatorEvent" + activatorEvent);

    const type = active?.data?.current?.type;

    if (type === 'spawn-window') {

      const canvasEl = document.getElementById('canvas');
      if (!canvasEl) return;

      const canvasRect = canvasEl.getBoundingClientRect();

      const clientX = activatorEvent.clientX;
      const clientY = activatorEvent.clientY;

      console.log("Activator Pos: " + activatorEvent.clientX + " " + activatorEvent.clientY)
      console.log("Canvas Pos: " + canvasRect.left + " " + canvasRect.top)
  
      const x = clientX - canvasRect.left;
      const y = clientY - canvasRect.top;

      console.log("New Win Pos: " + x + " " + y)

      const newWindow = {
        id: crypto.randomUUID(),
        type: 'floating-window',
        position: { x, y }
      };

      setWindows(prev => [...prev, newWindow]);
    }

    if (type === 'floating-window') {
      const id = event.active?.id;
      const delta = event.delta;


    }
  }, []);

  const handleDragMove = useCallback((event) => {
    // const { active, delta } = event;

    // console.log("handleDragMove")

    // const pointerX = active.rect.left + delta.x;
    // const pointerY = active.rect.top + delta.y;

    // console.log("active left" + active.rect.left)
    // console.log("active top" + active.rect.top)
    // console.log("delta x" + delta.x)
    // console.log("delta y" + delta.y)

    // setMousePos({ x: pointerX, y: pointerY });
  }, []);

  const updateWindowPosition = useCallback((id, newPos) => {
    setWindows(prev =>
      prev.map(w => w.id === id ? { ...w, position: newPos } : w)
    );
  }, []);

  const handleCloseWindow = useCallback((id) => {
    console.log("Closed Window" + id)
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  return (
    <DndContext sensors={sensors} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
      <div className="app-container">
        <SidePanel />
        <div className="divider" />
        <Canvas
          windows={windows}
          onClose={handleCloseWindow}
          onWindowDragEnd={updateWindowPosition}
        />
      </div>
    </DndContext>
  );
}

export default App
