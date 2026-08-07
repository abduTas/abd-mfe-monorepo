import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  // Edge runtime starts quickly near users; good for lightweight APIs.
  return NextResponse.json({
    revenue: 124320,
    activeUsers: 4210,
    churnRate: 2.3,
  });
}
