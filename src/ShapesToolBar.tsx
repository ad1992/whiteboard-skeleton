import { EllipseIcon, RectangleIcon, SelectIcon } from "./icons";
import "./ShapesToolBar.scss";

export type ActiveTool = "rectangle" | "ellipse" | "selection";

const ShapesToolBar = ({
  onClick,
  activeTool,
}: {
  onClick: (tool: ActiveTool) => void;
  activeTool: ActiveTool;
}) => {
  return (
    <div className="shapes-toolbar">
      <button
        onClick={onClick.bind(null, "selection")}
        className={activeTool === "selection" ? "active" : undefined}
      >
        {SelectIcon}
      </button>
      <button
        onClick={onClick.bind(null, "rectangle")}
        className={activeTool === "rectangle" ? "active" : undefined}
      >
        {RectangleIcon}
      </button>
      <button
        onClick={onClick.bind(null, "ellipse")}
        className={activeTool === "ellipse" ? "active" : undefined}
      >
        {EllipseIcon}
      </button>
    </div>
  );
};

export default ShapesToolBar;
