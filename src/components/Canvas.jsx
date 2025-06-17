import { useDroppable } from '@dnd-kit/core';
import FloatingWindow from './FloatingWindow';

function Canvas({ windows, onClose, onWindowDragEnd }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'canvas-dropzone' });

  return (
    <div
      id="canvas"
      ref={setNodeRef}
      className="canvas"
      style={{
        backgroundColor: isOver ? '#f0f0f0' : '#fafafa',
      }}
    >
      {windows.map(w => (
        <FloatingWindow
          key={w.id}
          id={w.id}
          type={w.type}
          position={w.position}
          onClose={onClose}
          onDragEnd={onWindowDragEnd}
        />
      ))}
    </div>
  );
}

export default Canvas;
