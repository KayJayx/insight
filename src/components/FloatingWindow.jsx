import { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';

function FloatingWindow({ id, type, position, onClose, onDragEnd }) {
  const [redisKey, setRedisKey] = useState("");
  const [basePosition, setBasePosition] = useState(position);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type }
  });

  // Handle drag end update
  useEffect(() => {
    if (!isDragging && transform) {
      const newX = basePosition.x + transform.x;
      const newY = basePosition.y + transform.y;
      onDragEnd(id, { x: newX, y: newY });
      setBasePosition({ x: newX, y: newY });
    }
  }, [isDragging]);

  const style = {
    position: 'absolute',
    top: basePosition.y,
    left: basePosition.x,
    width: '300px',
    height: '200px',
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
    zIndex: 10,
    opacity: isDragging ? 0.6 : 1,
    display: 'flex',
    flexDirection: 'column',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? 'none' : 'transform 150ms ease'
  };

  return (
    <div style={style}>
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
        ref={setNodeRef}
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
