-- CreateEnum
CREATE TYPE "event_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imgUrl" TEXT,
    "email" TEXT NOT NULL,
    "status" "event_status" NOT NULL DEFAULT 'PENDING',
    "eventLink" TEXT,
    "ticketLink" TEXT,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);
