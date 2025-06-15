import { useState } from 'react'    // Lets you manage local component state (for position or Redis key)
import { useDrag } from 'react-dnd' // Makes the component draggable

function FloatingWindow({ id, onClose, initialPosition }) {
  // This functional React component takes in 3 properties:
  // id              -> unique window
  // onClose         -> function to call when the close button is clicked
  // initialPosition -> starting coordinates on the canvas

  // Stores the current x, y position of the window
  const [position, setPosition] = useState(initialPosition)

  // Stores the input string representing the Redis key for this component
  const [redisKey, setRedisKey] = useState("")

  // Passing in an anonymous function into the useDrag function
  // the anonymous function returns 4 things: type, item, collect, end
  //
  // useDrag on the other hand returns an array of two elements
  // the first being the isDragging member of an object and a 
  // function called drag
  const [{ isDragging }, drag] = useDrag(() => ({

    // type is a required string, for matching draggable item with a 
    // compatible drop zone
    type: 'floating-instance',

    // item is a required object, for passing data to the drop target
    // when this is dragged
    item: { id, offset: position },

    // collect is a required function, lets you track drag state and
    // apply UI changes (like opacity)
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),

    // end is a required function, such that when dragging ends we can
    // calculate how far the item moved and update the window's position
    // accordingly
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      if (delta) {
        setPosition((prev) => ({
          x: prev.x + delta.x,
          y: prev.y + delta.y,
        }))
      }
    },
  }))

  // The style for the floating window defined here, it has absolute
  // positioning based on position, shadow, border, fixed dimensions,
  // reduced opacity while dragging and a flexDirection of column for
  // top bar and content layout placement
  const style = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    width: '300px',
    height: '200px',
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
    zIndex: 10,
    opacity: isDragging ? 0.6 : 1,
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    // The outer div
    <div style={style}>
      {/* Top Toolbar Area */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '5px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Redis Key Input Text Box */}
        <input
          type="text"
          placeholder="Redis Key"
          value={redisKey}
          onChange={(e) => setRedisKey(e.target.value)}
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        {/* Close Button */}
        <button
          onClick={() => onClose(id)}
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>

      {/*
      The main body of the component where other components
      will be placed
      */}
      <div style={{ flexGrow: 1, padding: '10px' }}>
        <p>Component content will appear here.</p>
      </div>

      {/* Drag Handle in Bottom-Right */}
      <div
        ref={drag}
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#ccc',
          position: 'absolute',
          bottom: 0,
          right: 0,
          cursor: 'grab',
        }}
        title="Drag to move"
      />
    </div>
  )
}

export default FloatingWindow
