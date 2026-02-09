// app/api/test-daily-email/route.ts
import { runDailyEventsEmail } from "@/src/lib/schedulers/sendDailyEventsEmail";

export async function POST() {
  await runDailyEventsEmail();
  return Response.json({ ok: true });
}
