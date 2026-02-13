// app/lib/registerFonts.ts
import fs from "fs/promises";
import path from "path";
import { registerFont } from "canvas";

export async function registerFonts() {
  const fonts = [
    { file: "Arial.ttf", family: "Arial", weight: "normal" },
    { file: "ARIALBD.ttf", family: "Arial", weight: "bold" },
  ];

  for (const font of fonts) {
    const srcPath = path.join(process.cwd(), "public/fonts", font.file);

    try {
      const buffer = await fs.readFile(srcPath);
      const tmpPath = path.join("/tmp", font.file); // serverless-safe
      await fs.writeFile(tmpPath, buffer);

      registerFont(tmpPath, { family: font.family, weight: font.weight });
      console.log(`Registered font: ${font.family} (${font.weight})`);
    } catch (err) {
      console.error(`Failed to register font ${font.file}:`, err);
    }
  }
}
