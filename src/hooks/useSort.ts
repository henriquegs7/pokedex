import { PokemonListProps } from "@/types/pokemons";

export function useSortPokemons(
  pokemons: PokemonListProps[],
  sortBy: "name" | "number" | "favorites",
  ascending: boolean
) {
  return [...pokemons].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "favorites") {
      comparison = Number(b.isFavorite) - Number(a.isFavorite);
    } else if (sortBy === "number") {
      comparison = a.id - b.id;
    } else if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    }

    return ascending ? comparison : -comparison;
  });
}
