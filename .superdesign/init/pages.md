# Page dependency tree

## / (Home Page)
Entry: src/app/page.tsx
Dependencies:
- src/components/layout/Header.tsx
- src/components/sections/HeroSection.tsx
  - src/components/lanyard/ThreeLanyard.tsx
  - src/components/lanyard/PhysicsLanyard.tsx
  - src/components/lanyard/StableLanyard.tsx
  - src/components/lanyard/InteractiveLanyard.tsx
  - src/data/personal.ts
- src/components/sections/AboutSection.tsx
  - src/data/personal.ts
  - src/data/skills.ts
- src/components/sections/ProjectsSection.tsx
  - src/data/projects.ts
  - src/components/projects/EvolystStayGallery.tsx
  - src/components/projects/EvolystConsoleGallery.tsx
  - src/components/projects/BusinessAdminGallery.tsx
  - src/components/projects/RestaurantPosGallery.tsx
  - src/components/projects/ImageCarouselDialog.tsx
  - src/components/projects/ProjectCaseStudyDialog.tsx
- src/components/sections/ContactSection.tsx
- src/components/layout/Footer.tsx