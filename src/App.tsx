import { useEffect, useRef, useState } from "react";
import "./App.scss";
import ShapesToolBar, { ActiveTool } from "./ShapesToolBar";
import { TrashIcon } from "./icons";
import { clearCanvas, drawRect } from "./draw";
import Scene from "./Scene";
import { createRect, getHitElement } from "./element";
import { getBgColor } from "./colors";

type PointerDownState = {
  origin: {
    x: number;
    y: number;
  };
  bgColor: string;
  selectedElementIds: Array<string>;
};

function App() {
  const [activeTool, setActiveTool] = useState<ActiveTool>("selection");
  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const pointerDownStateRef = useRef<PointerDownState | null>(null);
  const sceneRef = useRef<Scene | null>(null);

  const lastCoords = useRef<{ x: number; y: number } | null>(null);

  const createPointerDownState = (event: React.PointerEvent) => {
    if (!sceneRef.current) {
      return;
    }
    pointerDownStateRef.current = {
      origin: {
        x: event.clientX,
        y: event.clientY,
      },
      bgColor: getBgColor(),
      selectedElementIds: [],
    };

    lastCoords.current = {
      x: event.clientX,
      y: event.clientY,
    };

    const hitElement = getHitElement(sceneRef.current?.getElements(), {
      x: event.clientX,
      y: event.clientY,
    });
    if (hitElement) {
      pointerDownStateRef.current.selectedElementIds = [hitElement.id];
    }
  };

  useEffect(() => {
    if (!bgCanvasRef.current) {
      return;
    }
    sceneRef.current = new Scene(bgCanvasRef.current);
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    console.log("on pointer down");
    createPointerDownState(event);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (event: PointerEvent) => {
    console.log("on pointer move");
    console.log("LAST COORDS", lastCoords.current);
    console.log(pointerDownStateRef.current);
    if (
      !pointerDownStateRef.current ||
      !drawingCanvasRef.current ||
      !sceneRef.current ||
      !lastCoords.current
    ) {
      return;
    }
    const { origin, bgColor } = pointerDownStateRef.current;
    console.log(sceneRef.current?.getElements(), "ELEMENTS");

    const dx = event.clientX - lastCoords.current.x;
    const dy = event.clientY - lastCoords.current.y;

    if (activeTool === "rectangle") {
      const width = event.clientX - origin.x;
      const height = event.clientY - origin.y;
      clearCanvas(drawingCanvasRef.current);
      drawRect(drawingCanvasRef.current, origin.x, origin.y, width, height, {
        bgColor,
      });
    }

    console.log("DX = ", dx, "DY =", dy);
    if (
      activeTool === "selection" &&
      pointerDownStateRef.current.selectedElementIds.length
    ) {
      const elementMap = sceneRef.current.getElementMap();
      pointerDownStateRef.current.selectedElementIds.forEach((id) => {
        const ele = elementMap[id];
        Object.assign(ele, {
          x: ele.x + dx,
          y: ele.y + dy,
        });
      });
      sceneRef.current.redraw(pointerDownStateRef.current.selectedElementIds);
    }
    lastCoords.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const onPointerUp = (event: PointerEvent) => {
    console.log("pointer up");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);

    if (
      !pointerDownStateRef.current ||
      !sceneRef.current ||
      !drawingCanvasRef.current
    ) {
      return;
    }
    const { origin, bgColor } = pointerDownStateRef.current;
    clearCanvas(drawingCanvasRef.current);

    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    const dist = Math.hypot(dx, dy);
    console.log("distance", dist);

    if (dist > 5) {
      pointerDownStateRef.current.selectedElementIds = [];
    } else {
      sceneRef.current.redraw(pointerDownStateRef.current.selectedElementIds);
    }

    if (activeTool === "rectangle") {
      const width = event.clientX - origin.x;
      const height = event.clientY - origin.y;
      const rect = createRect({
        x: origin.x,
        y: origin.y,
        width,
        height,
        bgColor,
      });

      sceneRef.current?.updateElements([rect]);
      console.log(rect, "RECTANGLE");
      sceneRef.current.redraw(pointerDownStateRef.current.selectedElementIds);
    }

    setActiveTool("selection");
  };

  return (
    <div className="whiteboard">
      <div className="canvas-container">
        <canvas
          ref={bgCanvasRef}
          id="bg-canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onPointerDown={onPointerDown}
        />
        <canvas
          ref={drawingCanvasRef}
          id="drawing-canvas"
          width={window.innerWidth}
          height={window.innerHeight}
          onPointerDown={onPointerDown}
        />
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
