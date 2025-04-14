import { useInputStore } from "@/global/inputValue";
import { usePokemonData } from "@/hooks/usePokemonData";
import { Icon } from "../icon";

import styles from './styles.module.css'

export function InputSearch() {
  const { SearchByPokemonAPI } = usePokemonData();
  const { inputValue, setInputValue } = useInputStore();

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      SearchByPokemonAPI(inputValue.trim());
    }
  };

  return (
    <div className={styles.inputSearch}>
      <Icon name="IconSVGSearch" size={24} />
      <input
        name="query"
        placeholder="Procure seu Pokémon"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {inputValue &&
        <button
          onClick={() => setInputValue("")}
          type="button"
          className={styles.buttonClose}
        >
          <Icon name="IconSVGClose" size={24} />
        </button>
      }
    </div>
  )
}