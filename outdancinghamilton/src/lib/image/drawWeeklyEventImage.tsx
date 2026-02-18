import { createCanvas, loadImage } from "canvas";
import type { CanvasRenderingContext2D } from "canvas";
import path from "path";

/* -------------------- Helpers -------------------- */

export function getWeekRange(date = new Date()) {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay() + 1); // Monday

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Sunday

  const startDay = start.getDate();
  const endDay = end.getDate();

  return `(${start.toLocaleDateString("en-US", {
    month: "short",
  })} ${startDay}-${endDay})`;
}

export function groupEventsByDay(events: {
  eventName: string;
  date: Date;
}[]) {
  return events.reduce<Record<string, string[]>>((acc, event) => {
    const day = event.date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();

    if (!acc[day]) acc[day] = [];
    acc[day].push(event.eventName);

    return acc;
  }, {});
}

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

/* -------------------- Main -------------------- */

export async function drawWeeklyEventImage(events: {
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

  // Load template
  const template = await loadImage(
    path.join(process.cwd(), "public/images/ODHInsta2.jpg")
  );
  ctx.drawImage(template, 0, 0, width, height);

  ctx.fillStyle = "#FFD24A";
  ctx.textAlign = "center";

  /* ------------------ Header ------------------ */
  ctx.font = "700 65px Arial";
  let y = 550;

  const headerText = `HAMILTON DANCE EVENTS THIS WEEK ${getWeekRange().toUpperCase()}`;

  const headerBottomY = wrapText(ctx, headerText, width / 2, y, 900, 78);
  y = headerBottomY + 150;

  /* ------------------ Events ------------------ */
  const eventsByDay = groupEventsByDay(events);
  const orderedDays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  // Only keep days that have events
  const daysWithEvents = orderedDays.filter((day) => eventsByDay[day]?.length);

  // Dynamic spacing between day blocks
  const footerMargin = 280;
  const availableHeight = height - y - footerMargin;
  const spacing = daysWithEvents.length > 1
    ? Math.min(250, Math.max(80, availableHeight / daysWithEvents.length))
    : 0;

  ctx.font = "700 48px Arial";

  for (const day of daysWithEvents) {
    const dayEvents = eventsByDay[day];
    const text = `${day}: ${dayEvents.join(", ")}`;

    const lastLineY = wrapText(ctx, text, width / 2, y, 900, 60);
    y = lastLineY + spacing;
  }

  /* ------------------ Footer ------------------ */
  ctx.font = "700 48px Arial";
  const footerText =
    "For details of all events, and up-to-date listings, see the outdancinghamilton.com website (link in bio).";

  const footerY = height - 250; // fixed from bottom
  wrapText(ctx, footerText, width / 2, footerY, 1000, 60);

  return canvas.toBuffer("image/png");
}
