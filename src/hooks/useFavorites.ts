import { usePokemonStore } from "@/global/pokemons";
import { PokemonListProps } from "@/types/pokemons";
import { setStorage } from '@/services/localStorage';

export function useFavorites() {
  const { pokemons, setPokemons } = usePokemonStore();

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

    setPokemons(updatedList);
    setStorage('pokemons', updatedList);
  }

  return toggleFavorite;
}
