import { clearCanvas, drawRect, drawSelectionBorder } from "./draw";
import { Element } from "./element";
import { sceneCoordsToViewportCoords } from "./utils";

class Scene {
  private elements: readonly Element[];
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.elements = [];
    this.canvas = canvas;
  }

  getElements = () => {
    return this.elements;
  };

  updateElements = (newElements: Element[]) => {
    this.elements = [...this.elements, ...newElements];
  };

  replaceElements = (elements: Element[]) => {
    this.elements = elements;
  };

  getElementMap = () => {
    const elementsMap: { [key: string]: Element } = this.elements.reduce(
      (res, ele) => {
        return {
          ...res,
          [ele.id]: ele,
        };
      },
      {}
    );
    return elementsMap;
  };

  redraw = (
    selectedElementIds: Array<string>,
    opts: { scrollX: number; scrollY: number }
  ) => {
    console.log("REDRAWWW", opts);
    clearCanvas(this.canvas);
    this.elements.forEach((ele) => {
      const { clientX, clientY } = sceneCoordsToViewportCoords(
        ele.x,
        ele.y,
        opts
      );
      if (ele.type === "rectangle") {
        drawRect(this.canvas, clientX, clientY, ele.width, ele.height, {
          bgColor: ele.bgColor,
        });
      }
      if (selectedElementIds.includes(ele.id)) {
        drawSelectionBorder(
          this.canvas,
          clientX,
          clientY,
          ele.width,
          ele.height
        );
      }
    });
  };
}

export default Scene;
