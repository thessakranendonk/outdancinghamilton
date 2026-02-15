import { registerFont } from "canvas";
import path from "path";

let fontsRegistered = false;

export function registerFonts() {
  if (fontsRegistered) return;

  registerFont(
    path.join(process.cwd(), "app/fonts/Arial.ttf"),
    {
      family: "Arial",
      weight: "normal",
    }
  );

  registerFont(
    path.join(process.cwd(), "app/fonts/ARIALBD.ttf"),
    {
      family: "Arial",
      weight: "bold",
    }
  );

  fontsRegistered = true;
}
