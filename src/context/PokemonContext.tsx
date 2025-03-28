"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { PokemonListProps } from "@/types/pokemons";
import { getPokemonsFromDB } from "@/services/db";

type PokemonContextType = {
  pokemons: PokemonListProps[];
  setPokemons: (pokemons: PokemonListProps[]) => void;
};

type SearchPokemonNameContextType = {
  searchPokemonName: string;
  setSearchPokemonName: (searchPokemonName: string) => void;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);
const SearchPokemonNameContext = createContext<SearchPokemonNameContextType | undefined>(undefined);

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [pokemons, setPokemons] = useState<PokemonListProps[]>([]);
  const [searchPokemonName, setSearchPokemonName] = useState<string>('');

  useEffect(() => {
    async function fetchPokemons() {
      const pokemonsDB = await getPokemonsFromDB();
      setPokemons(pokemonsDB);
    }
    
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons }}>
      <SearchPokemonNameContext.Provider value={{ searchPokemonName, setSearchPokemonName }}>
        {children}
      </SearchPokemonNameContext.Provider>
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon deve ser usado dentro de um PokemonProvider");
  }
  return context;
}

export function useSearchPokemonName() {
  const context = useContext(SearchPokemonNameContext);
  if (!context) {
    throw new Error("useSearchPokemonName deve ser usado dentro de um SearchPokemonNameProvider");
  }
  return context;
}
