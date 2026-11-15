export type Action =
  | "up"
  | "down"
  | "right"
  | "left"
  | "zoomin"
  | "zoomout";

export let panelDisplayed = false;

let actionSettings :Action | null = null;

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
  const concealer = document.getElementById("key-settings-concealer");
  if (!concealer) {
  throw new Error("キー入力画面を取得できません");
  }

  if (keySettings) {
    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (actionSettings === null) return;

      event.preventDefault();

      if (event.code === "Escape") {
        actionSettings = null;
        concealer.style.display = "none";
        return;
      }

      keyBind.set(actionSettings, event.code);

      const description = document.getElementById(
        `${actionSettings}-description`
      );

      if (description) {
        description.textContent =
          `${actionSettings}操作のキー:${event.code}`;
      }

      actionSettings = null;
      concealer.style.display = "none";
    });
    
    keyBind.forEach((key, action) => {
      const child = document.createElement("div");
      child.id = `${action}-key-settings`;
      child.className = "key-settings-div";

      const description = document.createElement("p");
      description.textContent = `${action}操作のキー:${key}`;
      description.id = `${action}-description`;
      description.className = "key-settings-description";

      const changeButton = document.createElement("button");
      changeButton.textContent = "変更";
      changeButton.id = `${action}-change`;
      changeButton.className = "key-settings-change";

      const resetButton = document.createElement("button");
      resetButton.textContent = "リセット";
      resetButton.id = `${action}-reset`;
      resetButton.className = "key-settings-reset";

      child.appendChild(description);
      child.appendChild(changeButton);
      child.appendChild(resetButton);

      keySettings.appendChild(child);

      changeButton.addEventListener("click", () => {
        actionSettings = action;
        concealer.style.display = "flex";
      });
    });
  }
}

const cameraSensitivitySlider = 
document.getElementById("camera-sensitivity-slider") as HTMLInputElement;
const cameraSensitivity = document.getElementById("camera-sensitivity");
if (!cameraSensitivity) {
  throw new Error("カメラの速さを表示する要素を取得できません");
}

cameraSensitivitySlider.addEventListener("input",() => {
  cameraSensitivity.textContent = 
  `現在の速さ:${Math.round(Number(cameraSensitivitySlider.value)/64 *10)/10}ブロック/秒`;
})

export function getCameraSensitivity():number {
  return Number(cameraSensitivitySlider.value);
}