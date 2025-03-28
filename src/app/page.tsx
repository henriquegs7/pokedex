"use client";

import { useState } from "react";
import { Icon, InputSearch, Loading, Card, List, ScrollToTop } from "@/components";
import { usePokemon, useSearchPokemonName } from "@/context/PokemonContext";
import { useInfiniteScroll, usePokemonData } from "@/hooks";
import { PokemonListProps } from "@/types/pokemons";
import styles from "./page.module.css";

export default function Home() {
  const { pokemons } = usePokemon();
  const { loading, FetchPokemons, filteredPokemons } = usePokemonData();
  const { searchPokemonName } = useSearchPokemonName();

  const [seletedPokemon, setSelectedPokemon] = useState<PokemonListProps>({} as PokemonListProps);
  const [showCard, setShowCard] = useState(false);

  const { loadMoreRef } = useInfiniteScroll(FetchPokemons, pokemons.length === 1302 || searchPokemonName.length > 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <Icon name="IconSVGPokeball" size={24} className={styles.image} />
            <h1>Pokédex</h1>
          </div>
          <InputSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading ? <Loading /> : <List pokemonsList={filteredPokemons} onOpenModal={() => setShowCard(!showCard)} setSelectedPokemon={setSelectedPokemon} />}
        {filteredPokemons.length === 0 && <p className={styles.noPokemon}>Nenhum Pokemon encontrado</p>}
        <div ref={loadMoreRef} style={{ height: "20px", background: "white" }} />
      </div>
      <ScrollToTop />
      {showCard && <Card selectedPokemon={seletedPokemon} onClose={() => setShowCard(!showCard)} />}
    </div>
  );
}
