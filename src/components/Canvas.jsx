import FloatingWindow from './FloatingWindow';

const Canvas = ({ innerRef, windows, onClose, onMouseDown, onResizeMouseDown }) => {
  return (
    <div ref={innerRef} className="canvas">
      {windows.map(w => (
        <FloatingWindow
          key={w.id}
          id={w.id}
          type={w.type}
          position={w.position}
          size={w.size}
          onClose={onClose}
          onMouseDown={onMouseDown}
          onResizeMouseDown={onResizeMouseDown}
          windows={windows}
        />
      ))}
    </div>
  );
}

export default Canvas;
