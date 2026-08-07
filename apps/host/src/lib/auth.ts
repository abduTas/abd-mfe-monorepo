import { cookies } from "next/headers";
import { UserSession } from "@/types";

const SESSION_COOKIE = "pulseboard_session";

export const DEMO_USER: UserSession = {
  id: "u_demo",
  email: "admin@pulseboard.dev",
  name: "Demo Admin",
  role: "admin",
};

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  if (token === "demo-token") return DEMO_USER;
  return null;
}

export async function requireSession() {
  const session = await getSession();
  if (!session) return null;
  return session;
}

export { SESSION_COOKIE };
