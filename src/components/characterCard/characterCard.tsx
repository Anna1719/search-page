import { Character } from "@/utils/types";
import styles from "./characterCard.module.scss";
import { Link } from "react-router-dom";
import cn from "classnames";
import { getStatusColor } from "@/utils/getStatusColor";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const statusColor = "status-" + getStatusColor(character.status);
  return (
    <Link
      key={character.id}
      to={`/character/${character.id}`}
      className={styles.characterCard}
      aria-label={`View details of ${character.name}`}
    >
      <h2 className={styles.characterName}>
        {character.name} - {character.species}
      </h2>
      <div className={styles.characteristics}>
        <div>
          Status :{" "}
          <span className={cn(styles.status, styles[statusColor])}>
            {character.status}
          </span>
        </div>
        <div>
          Created : {new Date(character?.created)?.toLocaleDateString("ru-RU")}
        </div>
      </div>
    </Link>
  );
};
