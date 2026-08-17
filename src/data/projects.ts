export type Project = { number: string; title: string; category: string; year: string; description: string; stack: string[]; accent: string; };

export const projects: Project[] = [
  { number: "01", title: "Hotel Booking Platform", category: "Travel technology", year: "2026", description: "A responsive booking journey bringing search, availability, guest management and pricing into one considered experience.", stack: ["Next.js", "TypeScript", "Tailwind", "Supabase"], accent: "hotel" },
  { number: "02", title: "Business Admin Dashboard", category: "Enterprise systems", year: "2025", description: "A role-aware command centre for managing people, products, sales and the decisions behind them.", stack: ["Angular", "TypeScript", "Supabase"], accent: "dashboard" },
  { number: "03", title: "Restaurant POS System", category: "Restaurant operations", year: "2026", description: "A role-aware restaurant operating system for tables, orders, menu management, inventory and daily reporting.", stack: ["Next.js", "TypeScript", "Supabase"], accent: "ai" },
  { number: "04", title: "Personal Portfolio", category: "Digital identity", year: "2026", description: "An immersive digital calling card with a tactile lanyard interaction at its centre.", stack: ["Next.js", "Motion", "Tailwind"], accent: "portfolio" },
];
