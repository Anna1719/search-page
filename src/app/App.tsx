import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchResults } from "@/hooks/fetchSearchResult";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/searchBar";
import { CharacterList } from "@/components/characterList";
import { Pagination } from "@/components/pagination";
import styles from "./App.module.scss";
import { AxiosError } from "axios";
import { Loader } from "@/components/loader";

export const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("query") || "";
  const urlPage = searchParams.get("page") || "1";
  const [query, setQuery] = useState(urlQuery || "");
  const [page, setPage] = useState(Number(urlPage) || 1);

  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading, error } = useSearchResults(debouncedQuery, page);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value.trim());
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ name: debouncedQuery, page: newPage.toString() });
  };

  const is404Error =
    error instanceof AxiosError && error?.response?.status === 404;

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (page > 1) params.set("page", page.toString());
    setSearchParams(params);
  }, [query, page, setSearchParams]);

  return (
    <div className={styles.search}>
      <SearchBar onChange={handleInputChange} value={query} />
      {data?.info?.count && (
        <div className={styles.foundText}>
          <span className={styles.foundText__number}>
            Found characters: {data.info.count}
          </span>
        </div>
      )}
      <>
        {debouncedQuery !== "" && debouncedQuery?.length < 4 && (
          <div>Search query should be longer than 3</div>
        )}
        {isLoading && <Loader />}
        {is404Error && <div>There's nothing there</div>}
        {!is404Error && error && <div>Unexpected error</div>}
        <CharacterList characters={data?.results || []} />
        {data?.info?.pages && data.info.pages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data?.info?.pages || 1}
            onPageChange={handlePageChange}
          />
        )}
      </>
    </div>
  );
};

export default App;
