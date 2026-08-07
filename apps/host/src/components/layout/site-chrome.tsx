import { MainHeader } from "@/components/ui/main-header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-6 md:px-8">
        {children}
      </main>
    </>
  );
}
