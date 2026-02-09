// src/lib/image/drawDailyEventsImage.ts
import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";

const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

export async function drawEventImage(events: {
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

  let y = 520; // start drawing events lower
  const spacing = 140; // vertical space between events

  ctx.font = "bold 65px Arial";

  ctx.fillText(`TODAY (${dayName.toUpperCase()})`, width / 2, y + 40);

  for (const event of events) {
    const locationName = event.location.split(",")[0];

    ctx.fillText(event.eventName, width / 2, y + 180);

    ctx.font = "45px Arial";
    ctx.fillText(
  `${event.startTime}-${event.endTime} @ ${locationName}`,
  width / 2,
  y + 225
);



    y += spacing; // move to next event
    ctx.font = "bold 65px Arial"; // reset font for next event name
  }
   ctx.font = "65px Arial";
    ctx.fillText('Details on our website:', width / 2, y + 300)


  return canvas.toBuffer("image/png");
}
