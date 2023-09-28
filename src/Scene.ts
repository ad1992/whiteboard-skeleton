import { clearCanvas, drawRect } from "./draw";
import { Element } from "./element";

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

  redraw = () => {
    console.log("REDRAWWW");
    clearCanvas(this.canvas);
    this.elements.forEach((ele) => {
      if (ele.type === "rectangle") {
        drawRect(this.canvas, ele.x, ele.y, ele.width, ele.height, {
          bgColor: ele.bgColor,
        });
      }
    });
  };
}

export default Scene;
