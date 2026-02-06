"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  from?: string;
  to?: string;
};

export default function EventFilter({ from, to }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [localFrom, setLocalFrom] = useState(from ?? "");
  const [localTo, setLocalTo] = useState(to ?? "");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounced URL update
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const newParams = new URLSearchParams(params.toString());

      if (localFrom) newParams.set("from", localFrom);
      else newParams.delete("from");

      if (localTo) newParams.set("to", localTo);
      else newParams.delete("to");

      router.replace(`?${newParams.toString()}`, { scroll: false });
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localFrom, localTo]);

  return (
    <div className="relative ml-10" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg text-md font-semibold font-quicksand text-brand-pink border-1 border-brand-pink"
      >
        Filter by date
        <span className="text-lg">☰</span>
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-4 z-50 space-y-4">
          <div>
            <label className="block text-sm text-brand-base mb-1">From</label>
            <input
              type="date"
              value={localFrom}
              onChange={(e) => setLocalFrom(e.target.value)}
              className="w-full border rounded-lg p-2 text-brand-base text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-brand-base mb-1">To</label>
            <input
              type="date"
              value={localTo}
              onChange={(e) => setLocalTo(e.target.value)}
              className="w-full border rounded-lg p-2 text-brand-base text-sm"
            />
          </div>

          <button
            onClick={() => {
              setLocalFrom("");
              setLocalTo("");
            }}
            className="text-xs text-brand-base hover:text-black"
          >
            Clear dates
          </button>
        </div>
      )}
    </div>
  );
}
