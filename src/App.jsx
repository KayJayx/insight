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

  const checkCollision = useCallback((rectA, rectB) => {
    return !(
      rectA.x + rectA.width <= rectB.x ||
      rectA.x >= rectB.x + rectB.width ||
      rectA.y + rectA.height <= rectB.y ||
      rectA.y >= rectB.y + rectB.height
    );
  }, []);

  const handleDragEnd = useCallback(() => {
    dragStateRef.current = null;
  }, []);

  const handleDragMove = useCallback((event) => {
    const { delta } = event;
    const dragState = dragStateRef.current;
    if (!dragState || !canvasRef.current) return;

    if (!dragState.wasBlocked) {
      dragState.wasBlocked = { x: false, y: false };
    }
  
    const width = dragState.size.width;
    const height = dragState.size.height;
  
    const { x: lastAcceptedX, y: lastAcceptedY } = dragState.lastAccepted;
    const { x: lastDeltaX, y: lastDeltaY } = dragState.lastDelta;
  
    // Compute frame-wise delta
    const frameDeltaX = delta.x - lastDeltaX;
    const frameDeltaY = delta.y - lastDeltaY;
  
    let proposedX = lastAcceptedX + frameDeltaX;
    let proposedY = lastAcceptedY + frameDeltaY;

    //****************
    const pointerX = dragState.origin.x + delta.x;
    const pointerY = dragState.origin.y + delta.y;
    
    const crossedX =
      (frameDeltaX < 0 && pointerX < dragState.lastAccepted.x) ||
      (frameDeltaX > 0 && pointerX > dragState.lastAccepted.x);
    
    const crossedY =
      (frameDeltaY < 0 && pointerY < dragState.lastAccepted.y) ||
      (frameDeltaY > 0 && pointerY > dragState.lastAccepted.y);
    
    // If X hasn't crossed back, freeze horizontal motion
    if (!crossedX) proposedX = dragState.lastAccepted.x;
    
    // If Y hasn't crossed back, freeze vertical motion
    if (!crossedY) proposedY = dragState.lastAccepted.y;
    //****************

    const unblockedX = crossedX && dragState.wasBlocked.x;
    const unblockedY = crossedY && dragState.wasBlocked.y;
    
    if (unblockedX || unblockedY) {

      const proposedSnapRect = {
        x: pointerX,
        y: pointerY,
        width,
        height
      };

      let snapCausesCollision = false;
    
      for (let win of windows) {
        if (win.id === dragState.id) continue;
    
        const other = {
          x: win.position.x,
          y: win.position.y,
          width: win.size.width,
          height: win.size.height,
        };
    
        if (checkCollision(proposedSnapRect, other)) {
          snapCausesCollision = true;
          break;
        }
      }
    
      if (!snapCausesCollision) {
        proposedX = pointerX;
        proposedY = pointerY;
    
        dragState.origin = {
          x: pointerX - delta.x,
          y: pointerY - delta.y
        };
      }
    }

    let minX = -Infinity;
    let maxX = Infinity;
    let minY = -Infinity;
    let maxY = Infinity;
  
    for (let win of windows) {
      if (win.id === dragState.id) continue;
  
      const other = {
        x: win.position.x,
        y: win.position.y,
        width: win.size.width,
        height: win.size.height,
      };
  
      const proposed = {
        x: proposedX,
        y: proposedY,
        width,
        height,
      };
  
      if (!checkCollision(proposed, other)) continue;
  
      const horizontallyAligned =
        proposedY + height > other.y &&
        proposedY < other.y + other.height;
  
      const verticallyAligned =
        proposedX + width > other.x &&
        proposedX < other.x + other.width;
  
      if (
        frameDeltaX > 0 &&
        lastAcceptedX + width <= other.x &&
        proposedX + width > other.x &&
        horizontallyAligned
      ) {
        maxX = Math.min(maxX, other.x - width);
      }
  
      if (
        frameDeltaX < 0 &&
        lastAcceptedX >= other.x + other.width &&
        proposedX < other.x + other.width &&
        horizontallyAligned
      ) {
        minX = Math.max(minX, other.x + other.width);
      }
  
      if (
        frameDeltaY > 0 &&
        lastAcceptedY + height <= other.y &&
        proposedY + height > other.y &&
        verticallyAligned
      ) {
        maxY = Math.min(maxY, other.y - height);
      }
  
      if (
        frameDeltaY < 0 &&
        lastAcceptedY >= other.y + other.height &&
        proposedY < other.y + other.height &&
        verticallyAligned
      ) {
        minY = Math.max(minY, other.y + other.height);
      }
    }
  
    // Clamp to final allowed position
    proposedX = Math.max(minX, Math.min(maxX, proposedX));
    proposedY = Math.max(minY, Math.min(maxY, proposedY));

    const canvasRect = canvasRef.current.getBoundingClientRect();
  
    const boundaryX = canvasRect.width - dragState.size.width;
    const boundaryY = canvasRect.height - dragState.size.height;
  
    proposedX = Math.max(0, Math.min(proposedX, boundaryX));
    proposedY = Math.max(0, Math.min(proposedY, boundaryY));
  
    setWindows(prev =>
      prev.map(w =>
        w.id === dragState.id ? { ...w, position: { x: proposedX, y: proposedY } } : w
      )
    );

    const moved =
      proposedX !== dragState.lastAccepted.x ||
      proposedY !== dragState.lastAccepted.y;
    
    if (moved) {
      dragState.lastAccepted = { x: proposedX, y: proposedY };
      dragState.lastDelta = { x: delta.x, y: delta.y };
    }

    dragState.wasBlocked.x = !crossedX;
    dragState.wasBlocked.y = !crossedY;
  }, [checkCollision, windows]);

  const handleDragStart = useCallback((event) => {
    const { id } = event.active;
    const win = windows.find(w => w.id === id);
    if (win) {
      dragStateRef.current = {
        id,
        origin: { x: win.position.x, y: win.position.y },
        size: { width: win.size.width, height: win.size.height},
        lastAccepted: { x: win.position.x, y: win.position.y },
        lastDelta: { x: 0, y: 0 }
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
      position: { x: 0, y: 0 }, // default spawn position
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
