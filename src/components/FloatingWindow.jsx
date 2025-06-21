import '../App.css';
import { useDraggable } from '@dnd-kit/core';

function FloatingWindow({ id, type, position, size, onClose, onMouseDown, onResizeMouseDown, windows }) {

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: { type }
  });

  const style = {
    position: 'absolute',
    top: position.y,
    left: position.x,
    width: size.width,
    height: size.height,
    backgroundColor: 'white',
    border: '0.5px solid rgba(0, 0, 0, 0.666)',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
    boxSizing: 'border-box',
    borderRadius: '8px',
    zIndex: windows.findIndex(w => w.id === id) + 1,
    opacity: isDragging ? 0.6 : 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  return (
    <div ref={setNodeRef} style={style} onMouseDown={() => onMouseDown(id)}>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div
          {...listeners}
          {...attributes}
          style={{
            width: size.width,
            height: '25px',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        />
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

      <div style={{ flexGrow: 1, padding: '10px' }}>
        <p>Component content will appear here.</p>
      </div>

      <div
        className="resize-handle"
        onMouseDown={(e) => onResizeMouseDown(e, id)}
      />

    </div>
  );
}

export default FloatingWindow
