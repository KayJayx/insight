function SidePanel({ onAddWindow }) {

  return (
    // Side Panel Div
    <div className="side-panel">

      {/* Widgets Title */}
      <h3>Widgets</h3>

      {/* First Button */}
      <button className="icon-button" onClick={onAddWindow}>
        Add Window
      </button>

    </div>
  );
}

export default SidePanel
