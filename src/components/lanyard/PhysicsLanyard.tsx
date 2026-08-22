"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { StableLanyard } from "./StableLanyard";

const ThreeLanyard = dynamic(() => import("./ThreeLanyard"), {
  ssr: false,
  loading: () => <div className="three-lanyard three-lanyard-loading" aria-label="Loading interactive lanyard" />,
});

class LanyardErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("Interactive lanyard could not load; showing the stable version instead.", error, info);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type PhysicsLanyardProps = {
  /** When false the card is held off-stage; when true it drops into frame under gravity. */
  released?: boolean;
};

export function PhysicsLanyard({ released = true }: PhysicsLanyardProps) {
  // A cached or interrupted 3D asset must never take down the complete portfolio.
  return (
    <LanyardErrorBoundary fallback={<StableLanyard released={released} />}>
      <ThreeLanyard released={released} />
    </LanyardErrorBoundary>
  );
}
