"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/card";
import { Icon } from "@/components/icon";
import { InputSearch } from "@/components/inputSearch";
import { List } from "@/components/list";
import { Loading } from "@/components/loading";
import { ScrollToTop } from "@/components/scrollToTop";
import { Sort } from "@/components/sort";
import { usePokemonData } from "@/hooks/usePokemonData";
import { PokemonListProps } from "@/types/pokemons";
import { useInputStore } from "@/global/inputValue";

import styles from "./page.module.css";

export default function Home() {
  const { loading, FetchPokemons, filteredPokemons } = usePokemonData();
  const { inputValue } = useInputStore();

  const [seletedPokemon, setSelectedPokemon] = useState<PokemonListProps>({} as PokemonListProps);
  const [showCard, setShowCard] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || inputValue.length > 0) return;

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
  }, [ inputValue, loading]);

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
        <List 
          pokemonsList={filteredPokemons} 
          onOpenModal={() => setShowCard(!showCard)} 
          setSelectedPokemon={setSelectedPokemon} />
        {filteredPokemons.length === 0 && <p className={styles.noPokemon}>Nenhum Pokemon encontrado</p>}
        <div ref={loadMoreRef} style={{ height: "20px", background: "white" }} />
      </div>
      <ScrollToTop />
      {showCard && <Card selectedPokemon={seletedPokemon} onClose={() => setShowCard(!showCard)} />}
      {loading && <Loading loading={loading} />}
    </div>
  );
}
