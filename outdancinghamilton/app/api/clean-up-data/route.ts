import { prisma } from "@/src/lib/prisma";

export async function POST() {
  try {
    const result = await prisma.event.deleteMany({
      where: {
        date: { lt: new Date() }, // delete past events
      },
    });

    return new Response(
      JSON.stringify({ deleted: result.count }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to delete past events:", err);
    return new Response(
      JSON.stringify({ error: "Failed to delete past events" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
