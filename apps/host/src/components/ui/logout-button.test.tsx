import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockPush, mockRefresh, resetNavigationMocks } from "@/test/mocks/next-navigation";
import { createNavigationMock } from "@/test/mocks/next-navigation-module";

jest.mock("next/navigation", () => createNavigationMock());

import { LogoutButton } from "@/components/ui/logout-button";

describe("LogoutButton", () => {
  beforeEach(() => {
    resetNavigationMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders logout button", () => {
    render(<LogoutButton />);
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("calls logout API and redirects to login on click", async () => {
    const user = userEvent.setup();
    render(<LogoutButton />);

    await user.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
      expect(mockPush).toHaveBeenCalledWith("/login");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});
