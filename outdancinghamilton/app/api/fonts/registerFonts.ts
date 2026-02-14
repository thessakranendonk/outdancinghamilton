// app/lib/registerFonts.ts
import { registerFont } from "canvas";
import { Buffer } from "buffer";


// Load base64 files
import ARIAL_REGULAR from "@/app/api/fonts/Arial.ttf.base64";
import ARIAL_BOLD from "@/app/api/fonts/ARIALBD.ttf.base64";


export function registerFonts() {
  registerFont(Buffer.from(ARIAL_REGULAR, "base64"), { family: "Arial", weight: "normal" });
  registerFont(Buffer.from(ARIAL_BOLD, "base64"), { family: "Arial", weight: "bold" });
}
