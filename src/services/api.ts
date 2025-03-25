import axiosInstance from "./axios";

export type PokemonListProps = {
  name: string
  url: string
}

export const getPokemons = async (pokemons: PokemonListProps[]): Promise<PokemonListProps[]> => {
  const { data: { results } } = await axiosInstance.get(`pokemon?limit=${pokemons.length + 20}&offset=${pokemons.length}`); 

  const pokemonsAllData = await Promise.all(
    results.map(({ url }: { url: string }) => axiosInstance.get(url))
  );

  const fetchedPokemons = results.map(({ name }: { name: string }, i: number) => ({
    name,
    image: pokemonsAllData[i].data.sprites.front_default,
    data: pokemonsAllData[i].data,
  }));

  return fetchedPokemons;
};
