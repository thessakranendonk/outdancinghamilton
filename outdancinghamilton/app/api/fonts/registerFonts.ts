import path from "path";
import { registerFont } from "canvas";

registerFont(
  path.join(process.cwd(), "app/api/fonts/Arial-Regular.ttf"),
  { family: "Arial", weight: "normal" }
);

registerFont(
  path.join(process.cwd(), "app/api/fonts/Arial-Bold.ttf"),
  { family: "Arial", weight: "bold" }
);
