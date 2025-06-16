import { useDraggable } from '@dnd-kit/core';

function SidePanel() {

  // Calls the useDraggable function which returns 3 items:
  // attributes and listeners --> these attach required drag behaviors to the button
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: 'add-empty-window',
    data: { type: 'empty-window' }
  });

  return (
    // Side Panel Div
    <div className="side-panel">

      {/* Widgets Title */}
      <h3>Widgets</h3>

      {/* First Button, testig for now */}
      <button
        ref={setNodeRef}
        className="icon-button"
        {...attributes}
        {...listeners}
      >
        Add Window
      </button>

    </div>
  )
}

export default SidePanel
