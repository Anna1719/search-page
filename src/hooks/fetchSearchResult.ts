import { useQuery } from "@tanstack/react-query";
import { RickAndMortyApiResponse } from "@/utils/types";

const fetchCharacters = async (
  name: string,
  page: number
): Promise<RickAndMortyApiResponse> => {
  const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const useFetchCharacters = (name: string, page: number) => {
  return useQuery<RickAndMortyApiResponse, Error>({
    queryKey: ["characters", name, page],
    queryFn: () => fetchCharacters(name, page),
    enabled: name.length >= 3,
    retry: false,
  });
};
