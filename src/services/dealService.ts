import { api } from "./api";
import type { Product } from "../types/Product";

export const getTopDeals = async (limit: number = 10): Promise<Product[]> => {
  const response = await api.get(`/deals/top?limit=${limit}`);
  return response.data.data;
};
