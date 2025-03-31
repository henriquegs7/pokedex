import { Icon } from "@/components";
import { useSearchPokemonName } from "@/context/PokemonContext";
import { usePokemonData } from "@/hooks";
import styles from './styles.module.css'

export function InputSearch() {
  const { SearchByPokemonAPI } = usePokemonData();
  const { searchPokemonName, setSearchPokemonName } = useSearchPokemonName();

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      SearchByPokemonAPI(searchPokemonName.trim()); // Envia o nome completo ao pressionar Enter
    }
  };

  return (
    <div className={styles.inputSearch}>
      <Icon name="IconSVGSearch" size={24} />
      <input
        name="query"
        placeholder="Procure seu Pokémon"
        value={searchPokemonName}
        onChange={(e) => setSearchPokemonName(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {searchPokemonName &&
        <button
          onClick={() => setSearchPokemonName("")}
          type="button"
          className={styles.buttonClose}
        >
          <Icon name="IconSVGClose" size={24} />
        </button>
      }
    </div>
  )
}