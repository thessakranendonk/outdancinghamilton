// convert-fonts-to-base64.js
const fs = require("fs");
const path = require("path");

// Replace these with your font paths
const fonts = [
  { file: "public/fonts/Arial.ttf", out: "app/lib/fonts/Arial.ttf.base64" },
  { file: "public/fonts/ARIALBD.ttf", out: "app/lib/fonts/ARIALBD.ttf.base64" },
];

fonts.forEach(({ file, out }) => {
  const fontPath = path.join(__dirname, file);
  const fontData = fs.readFileSync(fontPath);
  const base64 = fontData.toString("base64");
  fs.writeFileSync(path.join(__dirname, out), base64);
  console.log(`Saved base64 font: ${out}`);
});
