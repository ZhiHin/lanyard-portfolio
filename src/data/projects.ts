export type CaseStudySection = { title: string; body: string; bullets: string[] };
export type CaseStudy = { overview: string; focus: string; sections: CaseStudySection[] };
export type Project = { number: string; title: string; category: string; year: string; description: string; stack: string[]; accent: string; githubUrl?: string; caseStudy: CaseStudy };

export const projects: Project[] = [
  {
    number: "01", title: "Hotel Booking Platform", category: "Travel technology", year: "2026",
    description: "A secure hotel booking ecosystem for guests and hotel teams, spanning discovery, availability, checkout and operations.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase"], accent: "hotel", githubUrl: "https://github.com/ZhiHin/Hotel-Management",
    caseStudy: {
      overview: "A production-structured hotel booking platform with a guest-facing stay discovery and reservation journey, backed by a responsive administration system for hotel operations.",
      focus: "Focus â€” reliable booking workflows, role-aware administration and security-first data handling.",
      sections: [
        { title: "Product scope", body: "The platform is designed to serve both guests and hotel staff through one shared authentication system, while keeping customer and administrative access strictly separated.", bullets: ["Guest and admin experiences under one platform", "Customer, super admin, admin, manager and staff roles", "Supabase authentication, Row Level Security and permission-aware routes"] },
        { title: "Guest journey", body: "The booking experience covers the decision-making path from the first search to a confirmed stay and the account tools needed afterwards.", bullets: ["Destination, dates, guests and rooms search", "Filterable and sortable room availability", "Room details, gallery, policies and booking summary", "Centralised price calculation, mock payment and confirmation", "Profile, favourites and booking history"] },
        { title: "Hotel operations", body: "The administration space is structured for the teams responsible for access, rooms, bookings, customers and business performance.", bullets: ["Role and user-group management", "Room catalogue, pricing, availability and room status", "Booking, customer and payment administration", "Revenue, occupancy and booking analytics", "Concurrency safeguards to prevent overbooking"] },
      ],
    },
  },
  {
    number: "02", title: "Business Admin Dashboard", category: "Enterprise systems", year: "2025",
    description: "An Angular 22 business management platform for users, products, sales, role-based access and performance reporting.",
    stack: ["Angular 22", "TypeScript", "Supabase", "ApexCharts"], accent: "dashboard", githubUrl: "https://github.com/ZhiHin/AdminPanel",
    caseStudy: {
      overview: "A modern Angular administration platform that gives teams a structured way to manage users, products, sales and business intelligence from one role-aware workspace.",
      focus: "Focus â€” clean enterprise architecture, configurable access and decision-ready reporting.",
      sections: [
        { title: "Architecture", body: "The application is planned around a feature-based Angular architecture with a dedicated core, shared UI, layouts and independently organised business modules.", bullets: ["Angular 22 with TypeScript and Angular Material", "Service-layer pattern between UI and data sources", "Mock services designed to be replaced by Supabase or REST APIs", "Strict models, reusable components and clean separation of concerns"] },
        { title: "Business modules", body: "Core management workflows are designed around the daily work of leadership, managers, team leads and sales teams.", bullets: ["Email authentication, session management and route guards", "Role and permission mapping for Director, Manager, Team Lead and Sales Person", "User lifecycle and role assignment", "Product catalogue, pricing, stock, search, filters and pagination", "Sales records with revenue, cost and profit calculations"] },
        { title: "Intelligence layer", body: "The dashboard turns operational data into focused views of revenue, profitability, products and team performance.", bullets: ["Summary cards for sales, revenue, cost, gross profit and margin", "Date filters from today through custom date ranges", "Revenue, sales and profit visualisations", "Product distribution, top-product ranking and team performance", "Loading, empty, error and confirmation states for a resilient UX"] },
      ],
    },
  },
  {
    number: "03", title: "Restaurant POS System", category: "Restaurant operations", year: "2026",
    description: "A modular Restaurant Operating System for service, menus, inventory, kitchen workflows, Smart Bill and multi-branch operations.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "PostgreSQL", "shadcn/ui"], accent: "ai", githubUrl: "https://github.com/ZhiHin/EvoPos",
    caseStudy: {
      overview: "A commercial-grade Restaurant Operating System, designed beyond a traditional POS to give cafes, restaurants and franchise groups a configurable, multi-tenant operating platform.",
      focus: "Focus â€” modular restaurant operations, mobile-first service and the Smart Bill Engine for group dining.",
      sections: [
        { title: "Platform foundation", body: "The system is designed as a modular monolith with feature-based modules, a service and repository layer, secure RBAC and a path to SaaS-scale multi-tenant deployment.", bullets: ["Restaurant, branch, floor and table hierarchy", "Owner, manager, cashier, waiter, kitchen, inventory and customer roles", "Secure email and Google login with server-side validation", "Tenant isolation, audit logging and configuration-driven business rules"] },
        { title: "Restaurant operations", body: "The product brings together the workflows required to run service, manage the menu and maintain back-of-house visibility.", bullets: ["Dine-in, takeaway, delivery, held and transferred orders", "Configurable menu, modifiers, combos, promotions and loyalty", "Dining sessions, QR ordering and real-time order status", "Kitchen Display System with station queues and timers", "Inventory, suppliers, recipes, stock movement and low-stock alerts"] },
        { title: "Smart Bill Engine", body: "The core differentiation is a billing engine designed for the real complexity of group dining and flexible settlement.", bullets: ["Personal subtotal and pay-my-order flows", "Split evenly, by quantity, percentage or selected items", "Shared items, family bills, pay-for-others and partial payments", "Mixed payment methods, live payment status and smart receipts", "Sales, profit, tax, staff, customer and inventory reporting"] },
      ],
    },
  },
  {
    number: "04", title: "Personal Portfolio", category: "Digital identity", year: "2026",
    description: "An immersive digital calling card with a tactile lanyard interaction at its centre.",
    stack: ["Next.js", "Motion", "Tailwind"], accent: "portfolio",
    caseStudy: {
      overview: "A personal portfolio designed as an interactive introductionâ€”combining editorial storytelling with a tactile digital identity card.",
      focus: "Focus â€” visual identity, interaction design and clear presentation of selected work.",
      sections: [
        { title: "The brief", body: "Create a portfolio that feels memorable while still making it easy for recruiters and collaborators to understand the work and get in touch.", bullets: ["A distinctive opening moment", "Clear navigation through projects and experience"] },
        { title: "What I built", body: "A responsive portfolio with an interactive lanyard, project galleries and direct pathways to a rÃ©sumÃ© and professional profiles.", bullets: ["Interactive 3D-inspired lanyard and ID card", "Responsive project showcases and image viewers", "LinkedIn, GitHub and rÃ©sumÃ© access", "Accessible navigation and reduced-motion support"] },
        { title: "The result", body: "The portfolio balances personality with clarity: the interaction creates a memorable first impression, while the project content stays practical and easy to scan.", bullets: ["A cohesive personal brand experience", "One home for work, skills and contact details"] },
      ],
    },
  },
];