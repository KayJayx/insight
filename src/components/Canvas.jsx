import { useDrop } from 'react-dnd' // Imports the useDrop hook, makes the canvas a valid drop target
import { useState } from 'react'    // Manager local statem store all floating windows
import { useRef } from 'react'      // Gives access to the raw DOM element of the canvas, used to calculate drop coordinates
import FloatingWindow from './FloatingWindow'

// Simple incrementing counter to give each new floating window a unique ID
let windowIdCounter = 1

function Canvas() {

  // Initializes the state variable windows as an empty array
  // where each window will be an object with id, position and type
  const [windows, setWindows] = useState([])

  // Creates a ref to the canvas DOM element so we can measure its
  // position for drop calculations
  const canvasRef = useRef(null)
  
  // Passing in an anonymous function into the useDrop function
  // the anonymous function returns 3 things: accept, drop, collect
  //
  // useDrop on the other hand returns an array of two elements
  // the first being the isOver member of an object and a 
  // function called drop
  const [{ isOver }, drop] = useDrop(() => ({

    // accept is a required string, it helps match the drop target
    // to valid drag source
    accept: 'floating-window',

    // drop is a required function, essentially a callback function
    // that is triggered when an accepted draggable is dropped
    drop: (item, monitor) => {

      // Gets the mouse position relative to the screen
      const offset = monitor.getClientOffset()

      // Measures the bounding box of the canvas element on the screen
      const canvasRect = canvasRef.current.getBoundingClientRect()
  
      // Converts screen coordinates into canvas-local coordinates for
      // proper positioning
      const localX = offset.x - canvasRect.left
      const localY = offset.y - canvasRect.top
  
      // Creates a new window object with a unique ID and drop position
      const newWindow = {
        id: windowIdCounter++,
        position: { x: localX, y: localY },
        type: item.type,
      }
  
      // Appends the new window to the current list of windows in state
      setWindows((prev) => [...prev, newWindow])
    },

    // collect is a required function, determines if the draggable item
    // is currently hovering over the canvas and allows for live visual
    // feedback (like a background color change)
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))
  
  // Connects the canvasRef DOM element to the useDrop logic, making it
  // a valid drop target
  drop(canvasRef)

  // Removes a window from state when the close button is clicked
  const handleClose = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  return (
    // Main canvas container, which uses ref so ti can act as a
    // drop target, has a relative position to allow for absolutely
    // positioned children and changes background color on hover
    <div
      ref={canvasRef}
      className="canvas"
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
