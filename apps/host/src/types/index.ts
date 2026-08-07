export type UserSession = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
};

export type Product = {
  id: string;
  name: string;
  price: number;
  inventory: number;
  category: string;
  updatedAt: string;
};

export type DashboardStats = {
  revenue: number;
  activeUsers: number;
  churnRate: number;
};
