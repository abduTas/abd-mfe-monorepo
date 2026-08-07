export type SkillCategory = {
  title: string;
  skills: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type Metric = {
  value: string;
  label: string;
};

export const portfolio = {
  name: "Abdulla Tasleem",
  title: "Staff / Tech Lead Frontend Engineer",
  tagline: "React · Next.js · TypeScript",
  email: "tasleem.abdulla@gmail.com",
  phone: "+91-9555934750",
  linkedin: "https://www.linkedin.com/in/abdulla-tasleem",
  photo: "/Abdulla.jpg",
  summary:
    "Nine years leading frontend teams on React, Next.js, and TypeScript. I architect systems that scale — from payroll platforms and POS integrations to AI chatbots and analytics dashboards — and I've taken Lighthouse scores from 65 to 90+ while cutting load times by nearly a third. I lead teams of 7+, own frontend architecture end-to-end, and champion AI-assisted workflows with Cursor, Claude, and MCP to help engineers ship 20–30% faster without sacrificing quality.",
  metrics: [
    { value: "9+", label: "Years Experience" },
    { value: "7+", label: "Engineers Led" },
    { value: "90+", label: "Lighthouse Score" },
    { value: "~30%", label: "Faster Delivery" },
  ] satisfies Metric[],
  skillCategories: [
    {
      title: "Frontend",
      skills: [
        "React",
        "Next.js (App Router/SSR/SSG)",
        "TypeScript",
        "Redux / Redux Saga",
        "React Query",
        "Tailwind CSS",
        "SCSS",
        "Styled Components",
        "Ant Design",
      ],
    },
    {
      title: "Architecture & Leadership",
      skills: [
        "System Design",
        "Frontend Architecture Standards",
        "Design Systems",
        "Technical Strategy",
        "Cross-functional Delivery",
        "Mentoring",
        "Sprint Planning",
      ],
    },
    {
      title: "Performance & Quality",
      skills: [
        "Core Web Vitals (LCP/CLS)",
        "Bundle Optimization",
        "Lighthouse Auditing",
        "Jest",
        "React Testing Library",
        "Accessibility (WCAG)",
      ],
    },
    {
      title: "Design Systems",
      skills: [
        "Storybook",
        "Design Tokens & Theming",
        "Private Component Packages",
        "GitHub Packages",
        "Vercel",
      ],
    },
    {
      title: "Backend / Platform",
      skills: ["Node.js", "Express", "RESTful APIs", "Docker"],
    },
    {
      title: "CI/CD & Deployment",
      skills: ["GitHub Actions", "Docker Containers", "AWS Amplify"],
    },
    {
      title: "AI-Assisted Engineering",
      skills: ["Cursor", "Claude", "MCP", "Figma AI"],
    },
    {
      title: "Tools",
      skills: ["Webpack", "Vite", "Git"],
    },
  ] satisfies SkillCategory[],
  experience: [
    {
      role: "Tech Lead — Nova Platform",
      company: "NovaTab",
      period: "Feb 2025 – Present",
      highlights: [
        "Lead a team of 7 frontend engineers; own architecture, sprint planning, and end-to-end delivery.",
        "Architect scalable systems including payroll integration, an AI chatbot, employee management, and analytics dashboards.",
        "Improved Core Web Vitals (LCP, CLS) by ~35% and reduced bundle size by ~25%, raising Lighthouse performance score from ~65 to 90+ and cutting load time by ~30%.",
        "Led deep technical audits, removing redundant libraries and modernizing the frontend stack.",
        "Drove adoption of AI-assisted development (Cursor, Claude, MCP, Figma AI), accelerating delivery by ~20–30%.",
        "Built real-time restaurant-tech features: order management, POS/KDS integration, dynamic menus, online ordering, and analytics dashboards.",
        "Defined frontend architecture standards that improved maintainability and team velocity.",
        "Built and published a private design system as a GitHub package with theming and design tokens, documented in Storybook and deployed on Vercel.",
        "Introduced Jest and React Testing Library for unit and component testing across the team.",
        "Set up CI/CD pipelines using GitHub Actions and Docker; deployed and configured services on AWS Amplify.",
      ],
    },
    {
      role: "Senior Software Developer",
      company: "Times Internet — Times Black, Times Prime",
      period: "Aug 2021 – Jan 2025",
      highlights: [
        "Architected and developed a premium credit card platform (ICICI partnership) using React, Next.js, TypeScript, Redux, React Query, SCSS, and Ant Design.",
        "Wrote unit and component tests with Jest and React Testing Library to cover critical flows and reduce regressions.",
        "Improved performance and scalability through optimized component design.",
        "Migrated a legacy React application to Next.js (Times Prime), improving SEO and page performance via SSR.",
        "Built and integrated APIs, optimized frontend rendering, and contributed to the CMS.",
        "Mentored developers and led feature delivery across cross-functional teams.",
      ],
    },
    {
      role: "Application Developer",
      company: "Telus International — Telus Home Optik",
      period: "Nov 2020 – Jul 2021",
      highlights: [
        "Developed user-facing features for a telecom/streaming platform serving a large subscriber base.",
        "Built and maintained dashboard views and UI components in collaboration with cross-functional teams.",
        "Worked closely with backend and QA teams to integrate APIs and ensure consistent release quality.",
      ],
    },
    {
      role: "Member Technical Staff",
      company: "Zamora Innovation",
      period: "Jul 2018 – Oct 2020",
      highlights: [
        "Delivered full-stack applications across legal, healthcare, and collaboration domains.",
        "Built real-time collaboration tools, admin dashboards, and management systems using React and Node.js.",
      ],
    },
    {
      role: "Junior Software Developer",
      company: "Talenq",
      period: "Jun 2017 – Jun 2018",
      highlights: [
        "Developed a hiring platform with job posting and candidate sourcing features.",
        "Built dashboard views for recruiters to track job postings and candidate pipelines.",
        "Collaborated with backend developers to integrate APIs and improve overall UI responsiveness.",
      ],
    },
  ] satisfies Experience[],
  education: {
    degree: "B.Tech in Computer Science",
    year: "2016",
  },
  navLinks: [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ],
} as const;
