import { useState, useEffect } from "react";
import { usePokemon, useSearchPokemonName } from "@/context/PokemonContext";
import { getPokemons, getSearchPokemons } from "@/services/api";
import { getPokemonsFromDB, savePokemonToDB } from "@/services/db";
import { PokemonListProps } from "@/types/pokemons";

export function usePokemonData() {
  const { pokemons, setPokemons } = usePokemon();
  const { searchPokemonName } = useSearchPokemonName();
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListProps[]>(pokemons);
  const [loading, setLoading] = useState(true);

  async function FetchPokemons() {
    try {
      setLoading(true);

      const pokemonsDB: PokemonListProps[] = await getPokemonsFromDB();
      // const isSalvedPokemon = pokemonsDB.length === pokemons.length

      // if (!isSalvedPokemon || !navigator.onLine) {
      //    setPokemons(pokemonsDB);
      //   console.log("Exibindo Pokémons salvos offline.");
      //   return;
      // }

      const response: PokemonListProps[] = await getPokemons({ limit: pokemonsDB.length + 20, offset: pokemons.length });
      setPokemons([...pokemons, ...response]);
      await savePokemonToDB([...pokemons, ...response]);

    } catch (err) {
      console.error("Erro ao carregar Pokémons.", err);
    } finally {
      setLoading(false);
    }
  }

  async function SearchByPokemonAPI() {
    try {
      setLoading(true);
      const response: PokemonListProps[] = await getSearchPokemons({ name: searchPokemonName });
      
      setFilteredPokemons(response);
    } catch (err) {
      console.error("Erro ao carregar a pesquisa do Pokemon.", err);
    } finally {
      setLoading(false);
    }
  };

  async function FilterPokemonExistingDB() {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemonName.toLowerCase())
    );
    
    setFilteredPokemons(filtered);
  }

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    FetchPokemons();
  }, []);

  useEffect(() => {
    FilterPokemonExistingDB();
  }, [searchPokemonName]);

  return {
    filteredPokemons,
    setFilteredPokemons,
    loading,
    FetchPokemons,
    SearchByPokemonAPI
  };
}
