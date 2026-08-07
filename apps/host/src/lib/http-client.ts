import axios from "axios";

// Central Axios instance:
// - WHY: keeps base config (baseURL, headers, interceptors) in one place.
// - WHEN: use this for browser/client data fetching where React Query manages cache/state.
// - HOW: relative baseURL allows same-origin API routes in Next.js (`/api/*`).
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  headers: {
    "Content-Type": "application/json",
  },
});
