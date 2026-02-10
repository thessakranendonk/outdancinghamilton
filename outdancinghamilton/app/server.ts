import { scheduleDailyEventsEmail } from "@/src/lib/schedulers/sendDailyEventsEmail";
import { deletePastEvents } from "./admin/dashboard/server-actions";
import { runDailyEventsEmail } from "@/src/lib/schedulers/sendDailyEventsEmail";
import { runWeeklyEventsEmail, scheduleWeeklyEventsEmail } from "@/src/lib/schedulers/sendWeeklyEventsEmail";

deletePastEvents();
await runDailyEventsEmail();
await runWeeklyEventsEmail()
scheduleDailyEventsEmail();
scheduleWeeklyEventsEmail()
