/** All drawing stuff stays here */

const SELECTION_COLOR = "#1971c2";
const bgColors = [
  "#dee2e6",
  "#ffe3e3",
  "#ffa8a8",
  "#ffdeeb",
  "#f3d9fa",
  "#e599f7",
  "#e5dbff",
  "#b197fc",
  "#dbe4ff",
  "#91a7ff",
  "#74c0fc",
  "#66d9e8",
  "#c5f6fa",
  "#c3fae8",
  "#63e6be",
  "#ffec99",
  "#ffd43b",
  "#ffe8cc",
  "#a9e34b",
  "#d3f9d8",
  "#ffc078",
  "#fff4e6",
  "#fff0f6",
  "#fff9db",
  "#f3f0ff",
];

export const getBgColor = () => {
  const index = Math.round(Math.random() * bgColors.length);

  return bgColors[index];
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
