"use client";

import dynamic from "next/dynamic";

const ThreeLanyard = dynamic(() => import("./ThreeLanyard"), {
  ssr: false,
  loading: () => <div className="three-lanyard three-lanyard-loading" aria-label="Loading interactive lanyard" />,
});

export function PhysicsLanyard() {
  return <ThreeLanyard />;
}
