export type Action =
  | "up"
  | "down"
  | "right"
  | "left"
  | "zoomin"
  | "zoomout";

export const defaultKeyBind = new Map<Action, string>([
  ["up", "KeyW"],
  ["down", "KeyS"],
  ["right", "KeyD"],
  ["left", "KeyA"],
  ["zoomin", "KeyI"],
  ["zoomout", "KeyK"]
]);

export const keyBind = new Map<Action, string>(defaultKeyBind);

let cameraSensitivity :number = 384;

export function getCameraSensitivity(): number {
  return cameraSensitivity;
}

export function setCameraSensitivity(value: number): void {
  cameraSensitivity = value;
}


let gridDisplayed: boolean = true;
let selectionDisplayed: boolean = true;

export function getGridDisplayed(): boolean {
  return gridDisplayed;
}
export function getSelectionDisplayed(): boolean {
  return selectionDisplayed;
}

export function setGridDisplayed(value: boolean): void {
  gridDisplayed = value;
}
export function setSelectionDisplayed(value: boolean): void {
  selectionDisplayed = value;
}