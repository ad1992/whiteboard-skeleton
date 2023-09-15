import { Element } from "./element";

class CanvasScene {
  private elements: readonly Element[];
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.elements = [];
    this.canvas = canvas;
  }

  getElements = () => {};

  updateElements = (newElements: Element[]) => {};

  replaceElements = (elements: Element[]) => {};

  redraw = () => {};
}

export default CanvasScene;
