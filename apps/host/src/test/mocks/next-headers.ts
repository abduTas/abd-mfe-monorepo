type CookieStore = Map<string, string>;

let cookieStore: CookieStore = new Map();

export function setMockCookies(cookies: Record<string, string>) {
  cookieStore = new Map(Object.entries(cookies));
}

export function clearMockCookies() {
  cookieStore = new Map();
}

export function createHeadersMock() {
  return {
    cookies: jest.fn(async () => ({
      get: (name: string) => {
        const value = cookieStore.get(name);
        return value ? { name, value } : undefined;
      },
    })),
  };
}
