import { Character } from "@/utils/types";
import styles from "./characterCard.module.scss";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className={styles.characterCard}>
      <div className={styles.name}>{character.name}</div>
      <div className={styles.characteristics}>{character.status}</div>
      <div className={styles.characteristics}>{new Date(character?.created)?.toLocaleDateString()}</div>
    </div>
  );
};
