import { Icon } from "@/components";
import { useSearchPokemonName } from "@/context/PokemonContext";
import { usePokemonData } from "@/hooks";
import styles from './styles.module.css'

export function InputSearch() {
  const { SearchByPokemonAPI } = usePokemonData();
  const { searchPokemonName, setSearchPokemonName } = useSearchPokemonName();

  async function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      await SearchByPokemonAPI();
    }
  }

  return (
    <div className={styles.inputSearch}>
      <Icon name="IconSVGSearch" size={24} />
      <input
        type="text"
        name="searchPokemonByName"
        placeholder='Procure seu Pokemon'
        value={searchPokemonName}
        onChange={(e) => setSearchPokemonName(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {searchPokemonName && (
        <button onClick={() => setSearchPokemonName('')} type="button" className={styles.buttonClose}>
          <Icon name="IconSVGClose" size={24} />
        </button>
      )}
    </div>
  )
}