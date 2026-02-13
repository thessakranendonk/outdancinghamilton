// app/lib/registerFonts.ts
import fs from "fs";
import path from "path";
import { registerFont } from "canvas";

export function registerFonts() {
  const fonts = [
    { file: "Arial.ttf", family: "Arial", weight: "normal" },
    { file: "ARIALBD.ttf", family: "Arial", weight: "bold" },
  ];

  for (const font of fonts) {
    const srcPath = path.join(process.cwd(), "public/fonts", font.file);

    if (!fs.existsSync(srcPath)) {
      console.error("Font not found:", srcPath);
      continue;
    }

    const tmpPath = path.join("/tmp", font.file);
    // Copy to /tmp at runtime — ensures Node-canvas can access it in serverless
    fs.copyFileSync(srcPath, tmpPath);

    registerFont(tmpPath, { family: font.family, weight: font.weight });
  }
}
