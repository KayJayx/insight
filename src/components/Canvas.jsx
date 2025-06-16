import { useDroppable } from '@dnd-kit/core';   // Imports the useDrop hook, makes the canvas a valid drop target
import { useState } from 'react'                // Manager local statem store all floating windows
import { useRef } from 'react'                  // Gives access to the raw DOM element of the canvas, used to calculate drop coordinates
import FloatingWindow from './FloatingWindow'

// Simple incrementing counter to give each new floating window a unique ID
let windowIdCounter = 1

function Canvas({ activeDragData, onDropOnCanvas }) {

  // Initializes the state variable windows as an empty array
  // where each window will be an object with id, position and type
  const [windows, setWindows] = useState([])

  // Creates a ref to the canvas DOM element so we can measure its
  // position for drop calculations
  const canvasRef = useRef(null)

  // Call the useDroppable function, passing an object with the canvas ID
  // the function also returns the isOver class data member and the
  // setNodeRef function
  const { isOver, setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const handleDrop = (event) => {

    // Checks if the canvas ref is current and whether or not we are
    // actively dragging
    if (!canvasRef.current || !activeDragData) return;

    // Gets the mouse position relative to the screen
    const { clientX, clientY } = event.activatorEvent;

    // Measures the bounding box of the canvas element on the screen
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // Converts screen coordinates into canvas-local coordinates for
    // proper positioning
    const localX = clientX - canvasRect.left;
    const localY = clientY - canvasRect.top;

    // Creates a new window object with a unique ID and drop position
    const newWindow = {
      id: windowIdCounter++,
      position: { x: localX, y: localY },
      type: activeDragData.type,
    };

    // Appends the new window to the current list of windows in state
    setWindows((prev) => [...prev, newWindow]);

    // Optional callback to reset drag state
    onDropOnCanvas();
  };

  // Removes a window from state when the close button is clicked
  const handleClose = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    // Main canvas container, which uses ref so ti can act as a
    // drop target, has a relative position to allow for absolutely
    // positioned children and changes background color on hover
    <div
      ref={(node) => {
        setNodeRef(node);
        canvasRef.current = node;
      }}
      className="canvas"
      onPointerUp={handleDrop}
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
        overflow: 'hidden',
      }}
    >
    
      {/*
      Loops through each window in state and renders a FloatingWindow
      at the given position
      */}
      {windows.map((w) => (
        <FloatingWindow
          key={w.id}
          id={w.id}
          onClose={handleClose}
          initialPosition={w.position}
        />
      ))}
    </div>
  )
}

export default Canvas
