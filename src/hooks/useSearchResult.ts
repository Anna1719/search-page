import { useQuery } from "@tanstack/react-query";
import { SearchResult } from "@/utils/types";
import api from "./axiosInstance";

export const fetchResults = async (
  query: string,
  page: number
): Promise<SearchResult> => {
  const params = {
    name: query,
    page,
  };
  const { data } = await api.get<SearchResult>("/api/character", { params });
  return data;
};

export const useSearchResults = (query: string, page: number) => {
  return useQuery<SearchResult>({
    queryKey: ["search", query, page],
    queryFn: () => fetchResults(query, page),
    enabled: !!query && query?.length > 3,
    staleTime: 30000,
    retry: false,
  });
};