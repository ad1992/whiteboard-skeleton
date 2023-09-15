import { useState } from "react";
import "./App.scss";
import ShapesToolBar, { ActiveTool } from "./ShapesToolBar";
import { TrashIcon } from "./icons";

function App() {
  const [activeTool, setActiveTool] = useState<ActiveTool>("selection");

  return (
    <div className="whiteboard">
      <div className="canvas-container">
        <canvas id="canvas" />
      </div>
      <ShapesToolBar
        onClick={(tool: ActiveTool) => {
          setActiveTool(tool);
        }}
        activeTool={activeTool}
      />
      <button className="trash">{TrashIcon}</button>
    </div>
  );
}

export default App;
