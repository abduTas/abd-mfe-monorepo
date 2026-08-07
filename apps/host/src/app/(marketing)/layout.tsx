import { SiteChrome } from "@/components/layout/site-chrome";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteChrome>
      <section className="space-y-6">{children}</section>
    </SiteChrome>
  );
}
