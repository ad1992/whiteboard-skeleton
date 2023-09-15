export interface Element {
  id: string;
  type: "rectangle" | "ellipse";
  x: number;
  y: number;
  width: number;
  height: number;
}

export const createRect = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
}): Element => {
  const id = `rect-${Math.round(Math.random() * 100)}`;
  const element: Element = { id, type: "rectangle", ...props };
  return normalizeElement(element);
};

export const createEllipse = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
}): Element => {
  const id = `ellipse-${Math.round(Math.random() * 100)}`;
  const element: Element = { id, type: "ellipse", ...props };
  return normalizeElement(element);
};

export const getHitElement = (
  elements: readonly Element[],
  coords: { x: number; y: number }
) => {};

export const normalizeElement = (ele: Element) => {
  const updatedElement = { ...ele };
  if (ele.width < 0) {
    Object.assign(updatedElement, {
      x: ele.x + ele.width,
      width: Math.abs(ele.width),
    });
  }
  if (ele.height < 0) {
    Object.assign(updatedElement, {
      y: ele.y + ele.height,
      height: Math.abs(ele.height),
    });
  }
  return updatedElement;
};
