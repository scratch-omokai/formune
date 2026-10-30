import './style.css'
import { resize } from "./draw";
import { update } from "./action";
import { draw } from "./draw";

type Action = "up" | "down" | "right" | "left" | "zoomin" | "zoomout" ;

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if(ctx === null){
  throw new Error("CanvasRenderingContext2Dを取得できません");
}
let cameraSpeed :number = 384;

let cameraX :number = 0;
let cameraY :number = 0;
let cameraSize :number = 1;

let mouseX :number = 0;
let mouseY :number = 0;
let leftMouse :boolean = false;
let rightMouse :boolean = false;

const keyBind = new Map<Action, string>([
  ["up","KeyW"],
  ["down","KeyS"],
  ["right","KeyD"],
  ["left","KeyA"],
  ["zoomin","KeyI"],
  ["zoomout","KeyK"]
]);

const pressKeys = new Set<string>();

addEventListener("keydown",(event) =>{
  pressKeys.add(event.code);
});

addEventListener("keyup",(event) =>{
  pressKeys.delete(event.code);
});

let lastTime = 0;

function gameLoop(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;

  lastTime = currentTime;

  cameraSpeed = 384/Math.sqrt(cameraSize);
  const Update = update(
    deltaTime,cameraSpeed,cameraX,cameraY,cameraSize,keyBind,pressKeys
  );
  cameraX = Update.cameraX;
  cameraY = Update.cameraY;
  cameraSize = Update.cameraSize;

  draw(canvas,ctx!,cameraX,cameraY,cameraSize,mouseX,mouseY,leftMouse);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("resize", ()=>{resize(canvas)});
resize(canvas);

window.addEventListener("mousemove", (event: MouseEvent) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

window.addEventListener("mousedown", (event: MouseEvent) => {
  if (event.target !== canvas) return;

  if (event.button === 0) leftMouse = true;
  if (event.button === 2) rightMouse = true;
});

window.addEventListener("mouseup", (event: MouseEvent) => {
  if (event.button === 0) leftMouse = false;
  if (event.button === 2) rightMouse = false;
});