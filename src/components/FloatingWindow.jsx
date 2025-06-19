import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

function FloatingWindow({ id, type, position, onClose }) {
  const [redisKey, setRedisKey] = useState("");

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id,
    data: { type }
  });

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
    flexDirection: 'column'
  };

  return (
    <div ref={setNodeRef} style={style}>
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
            width: '300px',
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
        <input
          type="text"
          placeholder="Redis Key"
          value={redisKey}
          onChange={(e) => setRedisKey(e.target.value)}
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <p>Component content will appear here.</p>
      </div>
      
    </div>
  );
}

export default FloatingWindow
