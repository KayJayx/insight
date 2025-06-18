function SidePanel({ onAddWindow }) {
  return (
    // Side Panel Div
    <div className="side-panel">

      {/* Widgets Title */}
      <h3>Widgets</h3>
      <hr />
      <button className="icon-button" onClick={onAddWindow}>
        Text Display
      </button>
      <hr />
      <button className="icon-button" onClick={onAddWindow}>
        Guage Meter
      </button>
      <hr />
      <button className="icon-button" onClick={onAddWindow}>
        Plot/Chart
      </button>
      <hr />
      <button className="icon-button" onClick={onAddWindow}>
        Data Table
      </button>
      <hr />
      <button className="icon-button" onClick={onAddWindow}>
        Log Viewer
      </button>
      <hr />
      <button className="icon-button" onClick={onAddWindow}>
        Time Display
      </button>
      <hr />

    </div>
  );
}

export default SidePanel
