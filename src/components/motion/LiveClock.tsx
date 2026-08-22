"use client";

import { useEffect, useState } from "react";

type LiveClockProps = {
  /** IANA zone, e.g. "Asia/Kuala_Lumpur". */
  timezone: string;
};

/**
 * A ticking local-time display. Renders a placeholder on the server and only
 * starts once mounted, so SSR and the first client paint always agree.
 */
export function LiveClock({ timezone }: LiveClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const tick = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  if (!now) {
    return (
      <span className="live-clock" aria-hidden="true">
        <span className="live-clock-time">--:--</span>
      </span>
    );
  }

  const time = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "2-digit", minute: "2-digit" }).format(now);
  const seconds = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, second: "2-digit" }).format(now);
  const day = new Intl.DateTimeFormat("en-GB", { timeZone: timezone, weekday: "long" }).format(now);
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hour: "numeric", hour12: false }).format(now));
  const mood = hour < 6 ? "Probably asleep" : hour < 12 ? "Morning coffee" : hour < 18 ? "Deep work hours" : hour < 23 ? "Evening build" : "Late night commit";

  return (
    <span className="live-clock">
      <span className="live-clock-time">
        {time}
        <small>:{seconds}</small>
      </span>
      <span className="live-clock-meta">
        {day} · {mood}
      </span>
    </span>
  );
}
