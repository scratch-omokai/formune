export type Action =
  | "up"
  | "down"
  | "right"
  | "left"
  | "zoomin"
  | "zoomout";

export let panelDisplayed = false;

export function initializeSettingsPanel(
  keyBind: Map<Action, string>
): void {
  const settingsButton = document.getElementById("settings-button");
  const settingsPanel = document.getElementById("settings-panel");
  const settingsClose = document.getElementById("settings-close");

  if (!settingsButton || !settingsPanel || !settingsClose) {
    throw new Error("設定画面の要素を取得できません");
  }

  settingsPanel.style.display = "none";
  settingsButton.style.display = "block";

  settingsButton.addEventListener("click", () => {
    settingsPanel.style.display = "block";
    settingsButton.style.display = "none";
    panelDisplayed = true;
  });

  settingsClose.addEventListener("click", () => {
    settingsPanel.style.display = "none";
    settingsButton.style.display = "block";
    panelDisplayed = false;
  });

  const keySettings = document.getElementById("key-settings");

  if (keySettings) {
    keyBind.forEach((key, action) => {
      const child = document.createElement("div");
      child.id = `${action}-key-settings`;
      child.className = "key-settings-div";

      const description = document.createElement("p");
      description.textContent = `${action}操作のキー:${key}`;
      description.id = `${action}-description`;
      description.className = "key-settings-description";

      const button = document.createElement("button");
      button.textContent = "変更";
      button.id = `${action}-change`;
      button.className = "key-settings-change";

      child.appendChild(description);
      child.appendChild(button);

      keySettings.appendChild(child);
    });
  }
}