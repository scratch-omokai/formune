import './style.css'
import { line } from "./draw";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if(ctx === null){
  throw new Error("CanvasRenderingContext2Dを取得できません");
}

let camera_x:number = 0;
let camera_y:number = 0;

