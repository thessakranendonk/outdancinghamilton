import { scheduleDailyEventsEmail } from "@/src/lib/schedulers/sendDailyEventsEmail";
import { deletePastEvents } from "./admin/dashboard/server-actions";
import { runDailyEventsEmail } from "@/src/lib/schedulers/sendDailyEventsEmail";

await runDailyEventsEmail();
deletePastEvents();
scheduleDailyEventsEmail();
