import { coordinate } from "./calculate";
import { real } from "./calculate";

export function draw(
  canvas :HTMLCanvasElement,
  ctx :CanvasRenderingContext2D,
  cameraX :number,
  cameraY :number,
  cameraSize :number,
  mouseX :number,
  mouseY :number
): void {
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  {
    const tmp :number =
    0 - (cameraX % 64 * cameraSize) + (width * 0.5) + (cameraSize * 32);
    const startX :number = 
    tmp - (Math.floor(tmp / (64 * cameraSize)) * 64 * cameraSize);

    for(let x = startX; width > x; x += 64 * cameraSize){
      line(ctx, x, 0, x, height, "#cccccc", 1);
    }
  }

  {
    const tmp :number =
    0 - (cameraY % 64 * cameraSize) + (height * 0.5) + (cameraSize * 32);
    const startY :number = 
    tmp - (Math.floor(tmp / (64 * cameraSize)) * 64 * cameraSize);

    for(let y = startY; width > y; y += 64 * cameraSize){
      line(ctx, 0, y, width, y, "#cccccc", 1);
    }
  }

  {
    const C = coordinate(
      mouseX,mouseY,cameraX,cameraY,cameraSize,width,height
    );
    const R =real(
      Math.floor((C.x - 32) / 64) * 64,Math.floor((C.y - 32) / 64) * 64,
      cameraX,cameraY,cameraSize,width,height
    );

    ctx.save();
    
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#8d8d8d";
    ctx.fillRect(R.x + 32*cameraSize, R.y + 32*cameraSize, 64*cameraSize, 64*cameraSize);

    ctx.restore();
  }
}

function line(
  ctx :CanvasRenderingContext2D,
  x1 :number,
  y1 :number,
  x2 :number,
  y2 :number,
  color :string,
  thickness :number
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function resize(canvas :HTMLCanvasElement): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}