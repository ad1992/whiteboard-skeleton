export interface Element {
  id: string;
  type: "rectangle" | "ellipse";
  x: number;
  y: number;
  width: number;
  height: number;
  bgColor: string;
}

const getId = () => {
  return Date.now().toString(20) + Math.round(Math.random() * 100);
};

export const createRect = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  bgColor: string;
}): Element => {
  const id = getId();
  const element: Element = { id, type: "rectangle", ...props };
  return normalizeElement(element);
};

export const createEllipse = (props: {
  x: number;
  y: number;
  width: number;
  height: number;
  bgColor: string;
}): Element => {
  const id = getId();
  const element: Element = { id, type: "ellipse", ...props };
  return element;
};

export const getHitElement = (
  elements: readonly Element[],
  coords: { x: number; y: number }
) => {
  const reversedElements = elements.slice().reverse();
  return reversedElements.find((ele) => {
    return (
      coords.x >= ele.x &&
      coords.x <= ele.x + ele.width &&
      coords.y >= ele.y &&
      coords.y <= ele.y + ele.height
    );
  });
};

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
