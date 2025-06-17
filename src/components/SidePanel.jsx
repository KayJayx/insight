import { useDraggable } from '@dnd-kit/core';

function SidePanel() {

  // Calls the useDraggable function which returns 3 items:
  // attributes and listeners --> these attach required drag behaviors to the button
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: 'spawn-window-button',
    data: { type: 'spawn-window' }
  });

  return (
    // Side Panel Div
    <div className="side-panel">

      {/* Widgets Title */}
      <h3>Widgets</h3>

      {/* First Button */}
      <button
        ref={setNodeRef}
        className="icon-button"
        {...attributes}
        {...listeners}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        Add Window
      </button>

    </div>
  );
}

export default SidePanel
