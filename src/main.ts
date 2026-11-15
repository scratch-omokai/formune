import './style.css'

import { resize , draw } from "./draw";
import { update } from "./update";
import {
  panelDisplayed,
  initializeSettingsPanel
} from "./settings/settingsPanel";

import {
  keyBind,
  getCameraSensitivity,
  getGridDisplayed,
  getSelectionDisplayed
} from "./settings/settings";

import{ canvas } from "./canvas";


let cameraX :number = 0;
let cameraY :number = 0;
let cameraSize :number = 1;

let mouseX :number | null = 0;
let mouseY :number | null = 0;

export let leftMouse :boolean = false;
export let rightMouse :boolean = false;


initializeSettingsPanel();


export const pressKeys = new Set<string>();
addEventListener("keydown",(event) =>{
  if (panelDisplayed) return;
  
  pressKeys.add(event.code);
});

addEventListener("keyup",(event) =>{
  pressKeys.delete(event.code);
});


let lastTime = 0;

function gameLoop(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;

  lastTime = currentTime;

  const cameraSpeed =
  getCameraSensitivity() / Math.sqrt(cameraSize);
  
  const Update = update(
    deltaTime,
    cameraSpeed,
    cameraX,
    cameraY,
    cameraSize,
    keyBind,
    pressKeys,
    panelDisplayed,
  );
  cameraX = Update.cameraX;
  cameraY = Update.cameraY;
  cameraSize = Update.cameraSize;

  draw(
    cameraX,
    cameraY,
    cameraSize,
    mouseX,
    mouseY,
    leftMouse,
    getGridDisplayed(),
    getSelectionDisplayed(),
  );

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("resize", ()=>{resize()});
resize();

window.addEventListener("mousemove", (event: MouseEvent) => {
  if ((event.target !== canvas) || panelDisplayed){
    mouseX = null;
    mouseY = null;
  }else{
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
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

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});