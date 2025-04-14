import { useState, useEffect } from "react";
import { useInputStore } from "@/global/inputValue";
import { usePokemonStore } from "@/global/pokemons";
import { getPokemons, getSearchPokemons } from "@/services/api";
import { setStorage, getStorage } from '@/services/localStorage';
import { PokemonListProps } from "@/types/pokemons";

export function usePokemonData() {
  const { inputValue } = useInputStore();
  const { pokemons, setPokemons } = usePokemonStore();

  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListProps[]>(pokemons);
  const [loading, setLoading] = useState<boolean>(false);

  async function FetchPokemons() {
    setLoading(true);

    try {
      const pokemonsStorage = getStorage('pokemons');

      console.log(pokemonsStorage?.length, pokemons?.length, inputValue);

      if (pokemonsStorage?.length > 0 && pokemons?.length ===0 && inputValue === "") { // arrumar logica, estadando problema de carregamento
        setPokemons(pokemonsStorage);

        return;
      }
      
      if (navigator.onLine) {
        const newPokemons = await getPokemons({ limit: 25, offset: pokemons?.length ?? 0 });

        setPokemons([...pokemons, ...newPokemons]);
        setStorage('pokemons', [...pokemons, ...newPokemons]);

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

  function FilterPokemonExistingStorage() {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredPokemons(filtered);
  }

  useEffect(() => {
    FilterPokemonExistingStorage();
  }, [inputValue]);

  useEffect(() => {
    setFilteredPokemons(pokemons);
  }, [pokemons]);

  return {
    filteredPokemons,
    loading,
    FetchPokemons,
    SearchByPokemonAPI
  };
}
