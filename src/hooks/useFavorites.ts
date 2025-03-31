import { usePokemon } from "@/context/PokemonContext";
import { PokemonListProps } from "@/types/pokemons";
import { resetAndSavePokemonsToDB } from "@/services/db"; // Alterado para atualizar apenas um item

export function useFavorites() {
  const { pokemons, setPokemons } = usePokemon();

  async function toggleFavorite(selected: PokemonListProps) {
    const isFavoriting = !selected.isFavorite;
    const updatedPokemon = { ...selected, isFavorite: isFavoriting };

    const index = pokemons.findIndex((p) => p.id === selected.id);
    if (index === -1) return;

    const updatedList = [...pokemons];
    updatedList[index] = updatedPokemon;

    if (isFavoriting) {
      updatedList.splice(index, 1);
      updatedList.unshift(updatedPokemon);
    }

    await resetAndSavePokemonsToDB(updatedList);
    setPokemons(updatedList);
  }

  return toggleFavorite;
}
