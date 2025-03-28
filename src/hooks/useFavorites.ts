import { usePokemon } from "@/context/PokemonContext";
import { PokemonListProps } from "@/types/pokemons";
import { resetAndSavePokemonsToDB } from "@/services/db";

export function useFavorites() {
  const { pokemons, setPokemons } = usePokemon();

  async function toggleFavorite(selected: PokemonListProps) {
    const isFavoriting = !selected.isFavorite;
    const updatedPokemon = { ...selected, isFavorite: isFavoriting };

    // Remove o Pokémon da lista atual
    const newPokemons = pokemons.filter((p) => p.id !== selected.id);

    let updatedList;
    if (isFavoriting) {
      // Coloca no topo se for favorito
      updatedList = [updatedPokemon, ...newPokemons];
    } else {
      // Volta para a posição original
      const smallerIndex = newPokemons.findLastIndex((p) => p.id < selected.id);
      const higherIndex = newPokemons.findIndex((p) => p.id > selected.id);

      const insertIndex = smallerIndex !== -1 ? smallerIndex + 1 : higherIndex !== -1 ? higherIndex : newPokemons.length;

      updatedList = [...newPokemons.slice(0, insertIndex), updatedPokemon, ...newPokemons.slice(insertIndex)];
    }    

    setPokemons(updatedList);
    await resetAndSavePokemonsToDB(updatedList);
  }

  return toggleFavorite;
}
