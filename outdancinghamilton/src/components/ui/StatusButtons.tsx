"use client";

import { EventStatus } from "@/src/lib/prisma";
import { useState } from "react";

interface StatusButtonsProps {
  onChange: (status: EventStatus.PENDING | EventStatus.APPROVED | EventStatus.REJECTED) => void;
  currentStatus: EventStatus.PENDING | EventStatus.APPROVED | EventStatus.REJECTED;
}

export default function StatusButtons({ onChange, currentStatus }: StatusButtonsProps) {
  const statuses: StatusButtonsProps["currentStatus"][] = [EventStatus.PENDING, EventStatus.APPROVED, EventStatus.REJECTED];

  return (
    <div className="flex space-x-2 mb-4">
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-4 py-2 rounded ${
            currentStatus === s ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {s.charAt(0) + s.slice(1).toLowerCase()}
        </button>
      ))}
    </div>
  );
}
