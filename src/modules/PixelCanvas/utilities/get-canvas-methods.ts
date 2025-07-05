export function getCanvasMethods(ctx: CanvasRenderingContext2D) {
  const draw = (callback: () => void) => {
    ctx.beginPath();
    callback();
    ctx.closePath();
  };
  const save = (callback: () => void) => {
    ctx.save();
    callback();
    ctx.restore();
  };

  const clear = () => ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  return {
    clear,
    draw,
    save
  } as const;
}