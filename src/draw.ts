/** All drawing stuff stays here */

const SELECTION_COLOR = "#1971c2";

export const clearCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawSelectionBorder = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const ctx = canvas.getContext("2d")!;
  ctx.strokeStyle = SELECTION_COLOR;
  ctx.strokeRect(x, y, width, height);
};

export const tracePath = (canvas: HTMLCanvasElement, x: number, y: number) => {
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "blue";
  ctx.fillRect(x, y, 5, 5);
};
