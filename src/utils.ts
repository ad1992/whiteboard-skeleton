export const viewportCoordsToSceneCoords = (
  clientX: number,
  clientY: number,
  opts: { scrollX: number; scrollY: number }
) => {
  const sceneX = clientX - opts.scrollX;
  const sceneY = clientY - opts.scrollY;
  return { sceneX, sceneY };
};

export const sceneCoordsToViewportCoords = (
  sceneX: number,
  sceneY: number,
  opts: { scrollX: number; scrollY: number }
) => {
  const clientX = sceneX + opts.scrollX;
  const clientY = sceneY + opts.scrollY;
  return { clientX, clientY };
};