"use client";

import { useGLTF, useTexture } from "@react-three/drei";

// GitHub Pages serves this project from a sub-path; every public asset must
// carry the same base path in production.
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const publicAsset = (path: string) => `${publicBasePath}${path}`;

export const LANYARD_ASSETS = {
  card: publicAsset("/card.glb"),
  strap: publicAsset("/evolyst-lanyard-texture.png"),
  cardTexture: publicAsset("/card-base-dark.png"),
};

let preloaded = false;

/**
 * Warm the 3D asset cache while the visitor is still reading the gate, so the
 * card can drop the instant the curtain clears. Safe to call repeatedly.
 */
export function preloadLanyardAssets() {
  if (preloaded || typeof window === "undefined") return;
  preloaded = true;
  try {
    useGLTF.preload(LANYARD_ASSETS.card);
    useTexture.preload(LANYARD_ASSETS.strap);
    useTexture.preload(LANYARD_ASSETS.cardTexture);
  } catch {
    // Preloading is an optimisation only; the lanyard still loads on demand.
    preloaded = false;
  }
}
