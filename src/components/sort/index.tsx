import { useEffect, useState } from "react";
import { usePokemonStore } from "@/global/pokemons";
import { useSortPokemons } from "@/hooks/useSort";
import { Icon } from "../icon";

import styles from "./styles.module.css";

export function Sort() {
  const { pokemons, setPokemons } = usePokemonStore();
  const [showSortCard, setShowSortCard] = useState(false);
  const [sortBy, setSortBy] = useState<string>("favorites");
  const [sortDirections, setSortDirections] = useState<{ [key: string]: boolean }>({
    name: true,
    number: true,
    favorites: true,
  });

  const optionsSort = ["name", "number", "favorites"];

  function handleSortChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSortBy(event.target.value)
  }

  function toggleSortDirection(option: string) {
    setSortDirections((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  useEffect(() => {
    function SortPokemons() {
      const sortedPokemons = useSortPokemons(pokemons, sortBy as "name" | "number" | "favorites", sortDirections[sortBy]);

      setPokemons(sortedPokemons);
    }

    SortPokemons()
  }, [sortBy, sortDirections]);

  return (
    <div className={styles.sortContainer}>
      <button
        type="button"
        onClick={() => setShowSortCard(!showSortCard)}
        className={styles.buttonSort}>
        #
      </button>
      <div className={styles.sortCard}>
        <div className={`${styles.sortCard} ${!showSortCard ? styles.hidden : ""}`}>
          <div className={styles.sortCardHeader}>Sort by:</div>
          <div className={styles.sortCardContent}>
            <div className={styles.radioGroup}>
              {optionsSort.map((option) => (
                <div className={styles.radioOption} key={option}>
                  <label className={styles.radio}>
                    <input
                      type="radio"
                      name="sort"
                      value={option}
                      checked={sortBy === option}
                      onChange={handleSortChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom}></span>
                    <span className={styles.radioLabel}>{option}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleSortDirection(option)}
                    className={styles.buttonSort}>
                    <Icon
                      name={"IconSVGArrowSort"}
                      size={16}
                      className={sortDirections[option] ? styles.iconArrowUp : styles.iconArrowDown}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}