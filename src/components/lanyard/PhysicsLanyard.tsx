"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { StableLanyard } from "./StableLanyard";

const ThreeLanyard = dynamic(() => import("./ThreeLanyard"), {
  ssr: false,
  loading: () => <div className="three-lanyard three-lanyard-loading" aria-label="Loading interactive lanyard" />,
});

class LanyardErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("Interactive lanyard could not load; showing the stable version instead.", error, info);
  }

  render() {
    return this.state.failed ? <StableLanyard /> : this.props.children;
  }
}

export function PhysicsLanyard() {
  // A cached or interrupted 3D asset must never take down the complete portfolio.
  return <LanyardErrorBoundary><ThreeLanyard /></LanyardErrorBoundary>;
}
