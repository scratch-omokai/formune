export function coordinate(
  inputX :number,
  inputY :number,
  cameraX :number,
  cameraY :number,
  cameraSize :number,
  width :number,
  height :number
):{x :number,y :number}{
  const x :number = cameraX + 1 / cameraSize * (width / (-2) + inputX);
  const y :number = cameraY + 1 / cameraSize * (height / (-2) + inputY);
  return {x,y};
}

export function real(
  inputX :number,
  inputY :number,
  cameraX :number,
  cameraY :number,
  cameraSize :number,
  width :number,
  height :number
):{x :number,y :number}{
  const x :number = (inputX - cameraX) * cameraSize + width / 2;
  const y :number = (inputY - cameraY) * cameraSize + height / 2;
  return {x,y};
}