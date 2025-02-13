import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetchCharacters } from "@/hooks/fetchSearchResult";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "@/components/searchBar";
import { CharacterList } from "@/components/characterList";
import { Pagination } from "@/components/pagination";
import styles from "./App.module.scss";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(name);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useFetchCharacters(
    debouncedSearchTerm,
    currentPage
  );

  useEffect(() => {
    setSearchParams({
      name: debouncedSearchTerm,
      page: currentPage.toString(),
    });
  }, [debouncedSearchTerm, currentPage, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSearchParams({ name: debouncedSearchTerm, page: newPage.toString() });
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Search characters...</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleInputChange} />
      {searchTerm.length > 2 &&
        (isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Sorry, no such character was found</p>
        ) : (
          <>
            <div className={styles.foundText}>
              Found characters: {data?.info?.count || 0}
            </div>
            <CharacterList characters={data?.results || []} />
            <Pagination
              currentPage={currentPage}
              totalPages={data?.info?.pages || 1}
              onPageChange={handlePageChange}
            />
          </>
        ))}
    </div>
  );
};

export default App;
