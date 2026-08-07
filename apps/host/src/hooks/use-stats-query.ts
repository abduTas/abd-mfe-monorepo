"use client";

import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http-client";
import { DashboardStats } from "@/types";

export function useStatsQuery() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await http.get<DashboardStats>("/api/stats");
      return data;
    },
  });
}
