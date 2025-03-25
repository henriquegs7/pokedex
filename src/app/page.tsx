"use client"
import { useEffect, useState } from "react";
import { Icon, InputSearch, Loading, PokemonList } from "@/components";
import { getPokemons, PokemonListProps } from "@/services/api";
import styles from "./page.module.css";


export default function Home() {
  const [namePokemon, setNamePokemon] = useState('');
  const [pokemons, setPokemons] = useState<PokemonListProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiPokemon = async () => {
      try {
        const response: PokemonListProps[] = await getPokemons(pokemons);
        console.log(response);
        setPokemons(response);
      } catch (err) {
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchApiPokemon();
  }, [namePokemon]);

  // useEffect(() => {
  //   // console.log(namePokemon);
  //   // console.log(pokemons);

  // }, [namePokemon]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Icon name="IconPNGPokeball" size={24} />
        <h1>Pokedex</h1>
      </div>
      <InputSearch valueSearch={namePokemon} onSubmit={(value) => { setNamePokemon(value) }} />
      <div className={styles.content}>
        {loading ? <Loading /> : <PokemonList pokemons={pokemons} />}
      </div>
    </div>
  );
}
