export const canvas =
  document.getElementById("game") as HTMLCanvasElement;

const context = canvas.getContext("2d");

if (context === null) {
  throw new Error("CanvasRenderingContext2Dを取得できません");
}

export const ctx: CanvasRenderingContext2D = context;