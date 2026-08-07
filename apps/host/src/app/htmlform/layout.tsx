import { SiteChrome } from "@/components/layout/site-chrome";

export default function HtmlFormLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
