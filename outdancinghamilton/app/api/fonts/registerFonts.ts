// app/api/fonts/registerFonts.ts
import path from "path";
import { registerFont } from "canvas";
import fs from "fs";

export function registerFonts() {
  const boldPath = path.join(process.cwd(), "app/src/lib/fonts/ARIALBD.ttf");
  const regularPath = path.join(process.cwd(), "app/src/lib/fonts/Arial.ttf");

  console.log("Bold font exists?", fs.existsSync(boldPath));
  console.log("Regular font exists?", fs.existsSync(regularPath));

  registerFont(regularPath, { family: "Arial", weight: "normal" });
  registerFont(boldPath, { family: "Arial", weight: "bold" });
}
