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
      console.error(`Font file not found: ${srcPath}`);
      continue;
    }

    // Only copy to /tmp if it exists (Vercel serverless)
    const isWindows = process.platform === "win32";
    const destPath = isWindows ? srcPath : path.join("/tmp", font.file);

    if (!isWindows) {
      fs.copyFileSync(srcPath, destPath);
    }

    registerFont(destPath, { family: font.family, weight: font.weight });
  }
}
