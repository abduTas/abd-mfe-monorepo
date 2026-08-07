import { mockBack, mockPrefetch, mockPush, mockRefresh, mockReplace } from "./next-navigation";

export function createNavigationMock() {
  return {
    useRouter: () => ({
      push: mockPush,
      refresh: mockRefresh,
      replace: mockReplace,
      back: mockBack,
      prefetch: mockPrefetch,
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
  };
}
