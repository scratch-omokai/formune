export type Action =
  | "up"
  | "down"
  | "right"
  | "left"
  | "zoomin"
  | "zoomout";

export const keyBind = new Map<Action, string>([
  ["up", "KeyW"],
  ["down", "KeyS"],
  ["right", "KeyD"],
  ["left", "KeyA"],
  ["zoomin", "KeyI"],
  ["zoomout", "KeyK"]
]);

let cameraSensitivity = 384;

export function getCameraSensitivity(): number {
  return cameraSensitivity;
}

export function setCameraSensitivity(value: number): void {
  cameraSensitivity = value;
}