import FloatingWindow from './FloatingWindow';

function Canvas({ windows, onClose}) {
  return (
    <div className="canvas">
      {windows.map(w => (
        <FloatingWindow
          key={w.id}
          id={w.id}
          type={w.type}
          position={w.position}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

export default Canvas;
