// app/api/test-daily-email/route.ts
// import { runDailyEventsEmail } from "@/src/lib/schedulers/sendDailyEventsEmail";
// import { runWeeklyEventsEmail } from "@/src/lib/schedulers/sendWeeklyEventsEmail";

// export async function POST() {
//   await runDailyEventsEmail();
//   await runWeeklyEventsEmail();
//   return Response.json({ ok: true });
// }
// app/api/weekly-email/route.ts
export async function GET() {
  return new Response("Hello from weekly-email");
}
