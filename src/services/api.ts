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

async function getDetailsPokemons(results: ResultsProps[]): Promise<PokemonListProps[]> {
  const pokemonsAllData = await Promise.all(
    results.map(({ url }: UrlProps) => axiosInstance.get(url))
  );

  const fetchedPokemons = results.map(({ name }: PokemonNameProps, i: number) => ({
    id: pokemonsAllData[i].data.id,
    name,
    image: pokemonsAllData[i].data.sprites.front_default,
    data: pokemonsAllData[i].data,
  }));

  return fetchedPokemons;
};

async function getPokemons({ limit, offset }: limitInfoProps): Promise<PokemonListProps[]> {
  try {
    const { data: { results } } = await axiosInstance.get(`pokemon?limit=${limit}&offset=${offset}`);

    return await getDetailsPokemons(results);
  } catch (error) {
    console.error("Erro ao buscar o Pokémon:", error);
    return [];
  }
};

async function getSearchPokemons({ name }: PokemonNameProps): Promise<PokemonListProps[]> {
  try {
    const { data } = await axiosInstance.get(`pokemon/${name.toLowerCase()}`);

    return [{
      id: data.id,
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