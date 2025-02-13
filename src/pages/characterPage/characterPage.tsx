import { useParams } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacterInfo";
import styles from "./characterPage.module.scss";
import { Loader } from "@/components/loader";

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useCharacter(id!);

  const createdDate = data?.created
    ? new Date(data.created).toLocaleDateString("ru-RU")
    : "Unknown";

  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching character data</div>;

  return (
    <div className={styles.characterPage}>
      <h1>{data?.name}</h1>
      {data?.image ? (
        <a
          href={data.image}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageLink}
        >
          See image
        </a>
      ) : (
        <p>No image available</p>
      )}
      <div className={styles.details}>
        <p>Status: {data?.status}</p>
        <p>Species: {data?.species}</p>
        <p>Type: {data?.type || "Unknown"}</p>
        <p>Gender: {data?.gender}</p>
        <p>Origin: {data?.origin.name}</p>
        <p>Location: {data?.location.name}</p>
        <p>Created: {createdDate}</p>
      </div>
    </div>
  );
};
