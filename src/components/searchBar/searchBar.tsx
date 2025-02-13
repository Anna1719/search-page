import styles from "./searchBar.module.scss";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {

  return (
    <input
      autoFocus
      type="search"
      placeholder="Search characters..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.input}
    />
  );
};
