import { registerFont } from "canvas";
import path from "path";
import { fileURLToPath } from "url";

let fontsRegistered = false;

export function registerFonts() {
  if (fontsRegistered) return;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  registerFont(
    path.join(__dirname, "../fonts/Arial.ttf"),
    {
      family: "Arial",
      weight: "normal",
    }
  );

  registerFont(
    path.join(__dirname, "../fonts/ARIALBD.ttf"),
    {
      family: "Arial",
      weight: "bold",
    }
  );

  fontsRegistered = true;
}
