import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export const metadata: Metadata = {
  title: "Abdulla Tasleem | Staff / Tech Lead Frontend Engineer",
  description:
    "Tech Lead with 9 years of experience architecting high-performance web applications with React, Next.js, and TypeScript. Lighthouse 90+, team leadership, design systems, and AI-assisted engineering.",
  openGraph: {
    title: "Abdulla Tasleem | Staff / Tech Lead Frontend Engineer",
    description:
      "React · Next.js · TypeScript — Leading teams, scaling frontends, and driving measurable performance gains.",
    type: "website",
  },
};

export default function HomePage() {
  return <PortfolioPage />;
}
