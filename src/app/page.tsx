"use client"
import { useEffect, useRef, useState } from "react";
import { Icon, InputSearch, Loading, Modal, PokemonList } from "@/components";
import { getPokemons, getSearchPokemons } from "@/services/api";
import { PokemonListProps, PokemonNameProps } from "@/types/pokemons";
import styles from "./page.module.css";

export default function Home() {
  const [searchPokemon, setSearchPokemon] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonListProps[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListProps[]>([]);

  const [seletedPokemon, setSelectedPokemon] = useState<PokemonListProps>({} as PokemonListProps);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);


  const loadingPokemon = async () => {
    try {
      const limit = pokemons.length + 20;
      const offset = pokemons.length;

      const response: PokemonListProps[] = await getPokemons({ limit, offset });

      setPokemons([...pokemons, ...response]);
      setFilteredPokemons([...filteredPokemons, ...response]);
    } catch (err) {
      setError("Erro ao carregar a lista de Pokemons.");
      console.error(error, err);
    } finally {
      setLoading(false);
    }
  };

  const searchByPokemon = async (searchPokemon: PokemonNameProps['name']) => {
    try {
      const response: PokemonListProps[] = await getSearchPokemons({ name: searchPokemon });

      setFilteredPokemons(response);
      setPokemons(response);
    } catch (err) {
      setError("Erro ao carregar a pesquisa do Pokemon.");
      console.error(error, err);
    } finally {
      setLoading(false);
    }
  };

  const filterPokemon = async () => {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );

    setFilteredPokemons(filtered);

    if (pokemons.length > 0 && showSearch) {
      await searchByPokemon(searchPokemon);
      setShowSearch(!showSearch);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    loadingPokemon();
  }, []);

  useEffect(() => {
    filterPokemon();
  }, [searchPokemon, showSearch]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (searchPokemon.length > 0) return

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadingPokemon();
      }
    });

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [pokemons.length, searchPokemon.length]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <Icon name="IconPNGPokeball" size={24} />
            <h1>Pokédex</h1>
          </div>
          <InputSearch valueSearch={searchPokemon} onSubmit={(value) => { setSearchPokemon(value) }} setValue={setShowSearch} value={showSearch} />
        </div>
      </div>

      <div className={styles.content}>
        {loading ? <Loading /> : <PokemonList pokemons={filteredPokemons} onOpenModal={() => setShowModal(!showModal)} setSelectedPokemon={setSelectedPokemon} />}
        {filteredPokemons.length === 0 && <p className={styles.noPokemon}>Nenhum Pokemon encontrado</p>}
        <div ref={loadMoreRef} style={{ height: "20px", background: "white" }} />
      </div>

      {error && <p>{error}</p>}

      <button onClick={scrollToTop} className={styles.buttonTop}>
        <Icon name="IconSVGArrowUp" size={24} className={styles.buttonTopIcon} />
      </button>
      
      {showModal && <Modal selectedPokemon={seletedPokemon} onClose={() => setShowModal(!showModal)} />}
    </div>
  );
}
