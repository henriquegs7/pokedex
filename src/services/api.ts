import axiosInstance from "./axios";
import { PokemonListProps, PokemonNameProps } from "@/types/pokemons";

type ResultsProps = {
  name: string
  url: string
}

type UrlProps = {
  url: string
}

type limitInfoProps = {
  limit: number
  offset: number
}

const getInfoPokemons = async (results: ResultsProps[]): Promise<PokemonListProps[]> => {
  const pokemonsAllData = await Promise.all(
    results.map(({ url }: UrlProps) => axiosInstance.get(url))
  );

  const fetchedPokemons = results.map(({ name }: PokemonNameProps, i: number) => ({
    name,
    image: pokemonsAllData[i].data.sprites.front_default,
    data: pokemonsAllData[i].data,
  }));

  return fetchedPokemons;
};

const getPokemons = async ({ limit, offset }: limitInfoProps): Promise<PokemonListProps[]> => {
  try {
    const { data: { results } } = await axiosInstance.get(`pokemon?limit=${limit}&offset=${offset}`);

    return await getInfoPokemons(results);
  } catch (error) {
    console.error("Erro ao buscar o Pokémon:", error);
    return [];
  }
};

const getSearchPokemons = async ({ name }: PokemonNameProps): Promise<PokemonListProps[]> => {
  try {
    const { data } = await axiosInstance.get(`pokemon/${name.toLowerCase()}`);

    return [{
      name: data.name,
      image: data.sprites.front_default,
      data: data,
    }];
  } catch (error) {
    console.error("Erro ao pesquisar o Pokémon:", error);
    return [];
  }
};

export { getPokemons, getSearchPokemons };