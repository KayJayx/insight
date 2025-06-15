import { useDrag } from 'react-dnd'

function SidePanel() {

  // Passing in an anonymous function into the useDrag function
  // the anonymous function returns 3 things: type, item, collect
  //
  // useDrag on the other hand returns an array of two elements
  // the first being the isDragging member of an object and a 
  // function called drag
  const [{ isDragging }, drag] = useDrag(() => ({

    // type is a required string, it helps match the drag source
    // to valid drop target (accept on drop)
    type: 'floating-window',

    // item is an optional function, it returns the object you
    // want to pass to the drop handler
    item: () => ({ type: 'empty-window' }),

    // collect is an optional function, it lets you track drag
    // state (like isDragging) using the monitor object
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    // Side Panel Div
    <div className="side-panel">

      {/* Components Title */}
      <h3>Components</h3>

      {/* First Button, testig for now */}
      <button ref={drag} className="icon-button">
        Add Window
      </button>

    </div>
  )
}

export default SidePanel
