import { prisma } from "@/src/lib/prisma";

export async function GET() {

  const now = new Date();

// Get today's midnight (UTC-safe)
const todayMidnight = new Date();
todayMidnight.setUTCHours(0, 0, 0, 0);

const result = await prisma.event.deleteMany({
  where: {
    date: { lt: todayMidnight },
  },
});



 

  return new Response(
    JSON.stringify({ deleted: result.count }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
