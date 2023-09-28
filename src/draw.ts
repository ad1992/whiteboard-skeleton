/** All drawing stuff stays here */

import { SELECTION_COLOR } from "./colors";

export const drawRect = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const ctx = canvas.getContext("2d")!;
  ctx.strokeRect(x, y, width, height);
};

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
  const threshold = 5;
  const ctx = canvas.getContext("2d")!;
  ctx.strokeStyle = SELECTION_COLOR;
  ctx.strokeRect(
    x - threshold,
    y - threshold,
    width + threshold * 2,
    height + threshold * 2
  );
};

export const tracePath = (canvas: HTMLCanvasElement, x: number, y: number) => {
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "blue";
  ctx.fillRect(x, y, 5, 5);
};
