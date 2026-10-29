type Action = "up" | "down" | "right" | "left" | "zoomin" | "zoomout" ;

export function update(
  deltaTime :number,
  cameraSpeed :number,
  cameraX :number,
  cameraY :number,
  cameraSize :number,
  keyBind :Map<Action, string>,
  pressKeys :Set<string>
):{cameraX :number, cameraY :number, cameraSize :number} {
  const speed :number = cameraSpeed * deltaTime;
  if (isAction("up", keyBind, pressKeys)) {
    cameraY -= speed;
  }

  if (isAction("down", keyBind, pressKeys)) {
    cameraY += speed;
  }

  if (isAction("left", keyBind, pressKeys)) {
    cameraX -= speed;
  }

  if (isAction("right", keyBind, pressKeys)) {
    cameraX += speed;
  }

  if (isAction("zoomin", keyBind, pressKeys)) {
    cameraSize *= 1.03;
  }

  if (isAction("zoomout", keyBind, pressKeys)) {
    cameraSize /= 1.03;
  }

  if(5 < cameraSize){cameraSize = 5};
  if(cameraSize < 0.1){cameraSize = 0.1};

  return {cameraX,cameraY,cameraSize};
}

function isAction(
  action :Action,
  keyBind :Map<Action, string>,
  pressKeys :Set<string>
) :boolean {
  return keyBind.has(action) && pressKeys.has(keyBind.get(action)!);
}