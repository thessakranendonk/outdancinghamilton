import { createCanvas, loadImage } from "canvas";
import type { CanvasRenderingContext2D } from "canvas";
import path from "path";

export const runtime = "nodejs";

/* ------------------ Wrap Text Helper ------------------ */
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, currentY);
  return currentY; // bottom Y of last line
}

/* ------------------ Time Formatting ------------------ */
export function formatTimeRange(start: string, end: string) {
  const toParts = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m);
    return d;
  };

  const startDate = toParts(start);
  const endDate = toParts(end);

  const startStr = startDate
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(/\s?(AM|PM)/, "");

  const endStr = endDate
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(" ", "")
    .toLowerCase();

  return `${startStr}-${endStr}`;
}

/* ------------------ Main Drawing Function ------------------ */
export async function drawTodaysEventImage(events: {
  eventName: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
}[]) {
  const width = 1080;
  const height = 1920;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Load background template
  const template = await loadImage(
    path.join(process.cwd(), "public/images/ODHInsta2.jpg")
  );
  ctx.drawImage(template, 0, 0, width, height);

  ctx.fillStyle = "#FFD24A";
  ctx.textAlign = "center";

  /* ------------------ Header ------------------ */
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

  ctx.font = "bold 65px Arial";
  const headerText = `TODAY (${dayName.toUpperCase()})`;

  let y = 530;
  const headerBottomY = wrapText(ctx, headerText, width / 2, y, 900, 78);
  y = headerBottomY + 150; // space after header

  /* ------------------ Dynamic Spacing ------------------ */
  const footerMargin = 280;
  const availableHeight = height - y - footerMargin;
  const minSpacing = 120;
  const maxSpacing = 250;

  const spacing =
    events.length > 1
      ? Math.min(maxSpacing, Math.max(minSpacing, availableHeight / events.length))
      : 0;

  /* ------------------ Draw Events ------------------ */
  for (const event of events) {
    const locationName = event.location.split(",")[0];

    ctx.font = "bold 65px Arial";
    const nameBottomY = wrapText(ctx, event.eventName, width / 2, y, 900, 70);

    ctx.font = "bold 45px Arial";
    wrapText(
      ctx,
      `${formatTimeRange(event.startTime, event.endTime)} @ ${locationName}`,
      width / 2,
      nameBottomY + 50,
      900,
      55
    );

    y += spacing; // move to next event block
  }

  /* ------------------ Footer ------------------ */
  ctx.font = "bold 60px Arial";
  const footerText = "Details on our website:";
  const footerY = height - 250;

  wrapText(ctx, footerText, width / 2, footerY, 1000, 60);

  return canvas.toBuffer("image/png");
}
