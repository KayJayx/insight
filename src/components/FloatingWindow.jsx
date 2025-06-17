import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

function FloatingWindow({ id, type, position, onClose }) {
  const [redisKey, setRedisKey] = useState("");

  const { attributes, listeners, setNodeRef, /*transform,*/ isDragging } = useDraggable({
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
    flexDirection: 'column',
    /*
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : 'none',
    */
    transition: isDragging ? 'none' : 'transform 150ms ease'
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '5px 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          placeholder="Redis Key"
          value={redisKey}
          onChange={(e) => setRedisKey(e.target.value)}
          style={{ flexGrow: 1, marginRight: '10px' }}
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
        {...listeners}
        {...attributes}
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          bottom: '0',
          right: '0',
          backgroundColor: '#ddd',
          cursor: isDragging ? 'grabbing' : 'grab',
          zIndex: 20
        }}
      />
    </div>
  );
}

export default FloatingWindow
