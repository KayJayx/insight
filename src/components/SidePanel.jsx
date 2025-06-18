function SidePanel({ onAddWindow }) {
  return (
    // Side Panel Div
    <div className="side-panel">

      {/* Widgets Title */}
      <h3>Widgets</h3>
      <hr />
      {/* First Button */}
      <button className="icon-button" onClick={onAddWindow}>
        Add Text
      </button>
      <hr />
      <button className="icon-button" onClick={onAddWindow}>
        Add Chart
      </button>
      <hr />

    </div>
  );
}

export default SidePanel
