"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, InputSearch, Loading, Card, List, ScrollToTop, Sort } from "@/components";
import { useSearchPokemonName } from "@/context/PokemonContext";
import { usePokemonData } from "@/hooks";
import { PokemonListProps } from "@/types/pokemons";
import styles from "./page.module.css";

export default function Home() {
  const { loading, FetchPokemons, filteredPokemons } = usePokemonData();
  const { searchPokemonName } = useSearchPokemonName();

  const [seletedPokemon, setSelectedPokemon] = useState<PokemonListProps>({} as PokemonListProps);
  const [showCard, setShowCard] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || searchPokemonName.length > 0) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        FetchPokemons();

        return
      }
    });

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [ searchPokemonName, loading]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <Icon name="IconSVGPokeball" size={24} className={styles.image} />
            <h1>Pokédex</h1>
          </div>
          <div className={styles.headerSearch}>
            <InputSearch />
            <Sort />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <List pokemonsList={filteredPokemons} onOpenModal={() => setShowCard(!showCard)} setSelectedPokemon={setSelectedPokemon} />
        {filteredPokemons.length === 0 && <p className={styles.noPokemon}>Nenhum Pokemon encontrado</p>}
        <div ref={loadMoreRef} style={{ height: "20px", background: "white" }} />
      </div>
      <ScrollToTop />
      {showCard && <Card selectedPokemon={seletedPokemon} onClose={() => setShowCard(!showCard)} />}
      {loading && <Loading loading={loading} />}
    </div>
  );
}
