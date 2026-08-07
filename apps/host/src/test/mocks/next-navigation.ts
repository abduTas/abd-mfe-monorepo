export const mockPush = jest.fn();
export const mockRefresh = jest.fn();
export const mockReplace = jest.fn();
export const mockBack = jest.fn();
export const mockPrefetch = jest.fn();

export function resetNavigationMocks() {
  mockPush.mockReset();
  mockRefresh.mockReset();
  mockReplace.mockReset();
  mockBack.mockReset();
  mockPrefetch.mockReset();
}
