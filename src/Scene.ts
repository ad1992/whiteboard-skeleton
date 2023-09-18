import { Element } from "./element";

class Scene {
  private elements: readonly Element[];
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.elements = [];
    this.canvas = canvas;
  }

  getElements = () => {};

  updateElements = (newElements: Element[]) => {};

  replaceElements = (elements: Element[]) => {};

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

  redraw = () => {};
}

export default Scene;
