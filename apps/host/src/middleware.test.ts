/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

function createRequest(pathname: string, cookie?: string) {
  const url = `https://example.com${pathname}`;
  const request = new NextRequest(url);

  if (cookie) {
    request.cookies.set("pulseboard_session", cookie);
  }

  return request;
}

describe("middleware", () => {
  it("redirects unauthenticated users from dashboard to login", () => {
    const response = middleware(createRequest("/dashboard"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://example.com/login?from=%2Fdashboard");
  });

  it("redirects unauthenticated users from nested dashboard routes", () => {
    const response = middleware(createRequest("/dashboard/products"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://example.com/login?from=%2Fdashboard%2Fproducts",
    );
  });

  it("allows authenticated users to access dashboard", () => {
    const response = middleware(createRequest("/dashboard", "demo-token"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("redirects authenticated users away from login", () => {
    const response = middleware(createRequest("/login", "demo-token"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://example.com/dashboard");
  });

  it("allows unauthenticated users to access login", () => {
    const response = middleware(createRequest("/login"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });
});
