import FloatingWindow from './FloatingWindow';

function Canvas({ windows, onClose, onWindowDragEnd }) {
  return (
    <div className="canvas">
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
