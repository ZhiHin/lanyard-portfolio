export type FunFact = { label: string; value: string; emoji?: string };

export const beyond = {
  location: "Kuala Lumpur, Malaysia",
  /** IANA zone for the live clock tile. */
  timezone: "Asia/Kuala_Lumpur",
  coordinates: "3.1390° N, 101.6869° E",
  currentlyBuilding: {
    title: "Restaurant Operating System",
    body: "Kitchen display queues, QR ordering and a Smart Bill Engine that finally makes splitting the bill painless.",
    stack: ["Next.js", "PostgreSQL", "shadcn/ui"],
  },
  philosophy: "Good software respects the person on the other side of the screen.",
  facts: [
    { label: "Favourite stack", value: "TypeScript end to end", emoji: "⚡" },
    { label: "Design habit", value: "Sketch before code", emoji: "✏️" },
    { label: "Working style", value: "Calm, considered, shipped", emoji: "🧭" },
    { label: "Fuel", value: "Kopi and good playlists", emoji: "☕" }, // TODO: personalise
  ] satisfies FunFact[],
};
