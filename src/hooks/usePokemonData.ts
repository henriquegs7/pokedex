import { useState, useEffect } from "react";
import { usePokemon, useSearchPokemonName } from "@/context/PokemonContext";
import { getPokemons, getSearchPokemons } from "@/services/api";
import { getPokemonsFromDB, savePokemonToDB } from "@/services/db";
import { PokemonListProps } from "@/types/pokemons";

export function usePokemonData() {
  const { pokemons, setPokemons } = usePokemon();
  const { searchPokemonName } = useSearchPokemonName();
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListProps[]>(pokemons);
  const [loading, setLoading] = useState<boolean>(false);

  async function FetchPokemons() {
    setLoading(true);

    try {
      const pokemonsDB: PokemonListProps[] = await getPokemonsFromDB();

      if (pokemonsDB.length > 0 && filteredPokemons.length < 2 && searchPokemonName === "") {
        setPokemons(pokemonsDB);
        return;
      }

      if (navigator.onLine) {
        const newPokemons = await getPokemons({ limit: 20, offset: pokemonsDB.length });

        setPokemons([...pokemons, ...newPokemons]);
        await savePokemonToDB([...pokemonsDB, ...newPokemons]);
        return;
      }
    } catch (err) {
      console.error("Erro ao carregar Pokémons.", err);
    } finally {
      setLoading(false);
    }
  }

  async function SearchByPokemonAPI(name: string) {
    setLoading(true);
    try {
      const response: PokemonListProps[] = await getSearchPokemons({ name });
      setPokemons(response);

      return
    } catch (err) {
      console.error("Erro ao carregar a pesquisa do Pokemon.", err);
    } finally {
      setLoading(false);
    }
  };

  function FilterPokemonExistingDB() {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemonName.toLowerCase())
    );

    setFilteredPokemons(filtered);
  }

  useEffect(() => {
    FilterPokemonExistingDB();
  }, [searchPokemonName]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return {
    filteredPokemons,
    setFilteredPokemons,
    loading,
    FetchPokemons,
    SearchByPokemonAPI
  };
}
