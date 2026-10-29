type Action = "up" | "down" | "right" | "left" ;

export function update(
  deltaTime :number,
  cameraSpeed :number,
  cameraX :number,
  cameraY :number,
  keyBind :Map<Action, string>,
  pressKeys :Set<string>
):{cameraX :number, cameraY :number} {
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

  return {cameraX,cameraY};
}

function isAction(
  action :Action,
  keyBind :Map<Action, string>,
  pressKeys :Set<string>
) :boolean {
  return keyBind.has(action) && pressKeys.has(keyBind.get(action)!);
}