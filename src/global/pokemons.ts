import { create } from 'zustand';
import { PokemonListProps } from '@/types/pokemons';

type PokemonStore = {
  pokemons: PokemonListProps[];
  setPokemons: (pokemons: PokemonListProps[]) => void;
  addPokemon: (pokemon: PokemonListProps) => void;
  clearPokemons: () => void;
};

const usePokemonStore = create<PokemonStore>((set) => ({
  pokemons: [],
  setPokemons: (pokemons) => set({ pokemons }),
  addPokemon: (pokemon) =>
    set((state) => ({ pokemons: [...state.pokemons, pokemon] })),
  clearPokemons: () => set({ pokemons: [] }),
}));

export { usePokemonStore };
