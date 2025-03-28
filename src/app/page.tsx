"use client"
import { useEffect, useRef, useState } from "react";
import { Icon, InputSearch, Loading, Card, List } from "@/components";
import { getPokemons, getSearchPokemons } from "@/services/api";
import { PokemonListProps, PokemonNameProps } from "@/types/pokemons";
import { getPokemonsFromDB, resetAndSavePokemonsToDB, savePokemonToDB } from "@/services/db";
import styles from "./page.module.css";

export default function Home() {
  const [searchPokemon, setSearchPokemon] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonListProps[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListProps[]>([]);

  const [seletedPokemon, setSelectedPokemon] = useState<PokemonListProps>({} as PokemonListProps);
  const [showCard, setShowCard] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  function ScrollToTop() {
    document.querySelectorAll("*").forEach((el) => {
      if (el.scrollTop > 0) {
        el.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  function SetDataPokenons(response: PokemonListProps[]) {
    setPokemons(response);
    setFilteredPokemons(response);
  }

  async function LoadingPokemon() {
    try {
      const limit = pokemons.length + 20;
      const offset = pokemons.length;

      const pokemonsDB: PokemonListProps[] = await getPokemonsFromDB()
      const isSalvedPokemon = pokemonsDB.length === pokemons.length

      if (!isSalvedPokemon || !navigator.onLine) {
        SetDataPokenons(pokemonsDB);
        setError("Esses são os Pokemons que você conseguiu salvar");
        return;
      }

      const response: PokemonListProps[] = await getPokemons({ limit, offset });

      SetDataPokenons([...pokemons, ...response]);
      await savePokemonToDB([...pokemons, ...response]);

      setError("")
    } catch (err) {
      setError("Erro ao carregar a lista de Pokemons.");
      console.error(error, err);
    } finally {
      setLoading(false);
    }
  };

  async function SearchByPokemon(searchPokemon: PokemonNameProps['name']) {
    try {
      const response: PokemonListProps[] = await getSearchPokemons({ name: searchPokemon });

      SetDataPokenons(response);
      setError("")
    } catch (err) {
      setError("Erro ao carregar a pesquisa do Pokemon.");
      console.error(error, err);
    } finally {
      setLoading(false);
    }
  };

  async function FilterPokemon() {
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );

    setFilteredPokemons(filtered);

    if (pokemons.length > 0 && showSearch) {
      await SearchByPokemon(searchPokemon);
      setShowSearch(!showSearch);
    }
  }

  useEffect(() => {
    LoadingPokemon();
  }, []);

  useEffect(() => {
    FilterPokemon();
  }, [searchPokemon, showSearch]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (searchPokemon.length > 0) return
    if (pokemons.length === 1302) return

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        LoadingPokemon();
      }
    });

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();

  }, [pokemons.length, searchPokemon.length]);

  useEffect(() => {
    const updateFavorites = async () => {
      const newPokemons = filteredPokemons.filter(pokemon => pokemon.id !== seletedPokemon.id);

      let updatedList;

      if (seletedPokemon.isFavorite) {
        updatedList = [seletedPokemon, ...newPokemons];
      } else {
        let smallerIndex = newPokemons.findLastIndex(pokemon => pokemon.id < seletedPokemon.id);
        let greaterIndex = newPokemons.findIndex(pokemon => pokemon.id > seletedPokemon.id);

        let insertIndex = smallerIndex !== -1 ? smallerIndex + 1 : greaterIndex !== -1 ? greaterIndex : newPokemons.length;
        updatedList = [...newPokemons.slice(0, insertIndex), seletedPokemon, ...newPokemons.slice(insertIndex)];
      }

      setFilteredPokemons(updatedList);
      await resetAndSavePokemonsToDB(updatedList);
    };

    updateFavorites();
  }, [seletedPokemon]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContent}>

          <div className={styles.headerTitle}>
            <Icon name="IconSVGPokeball" size={24} className={styles.image} />
            <h1>Pokédex</h1>
          </div>

          <InputSearch valueSearch={searchPokemon} onSubmit={(value) => { setSearchPokemon(value) }} setValue={setShowSearch} value={showSearch} />
        </div>
      </div>

      <div className={styles.content}>
        {loading ? <Loading /> : <List pokemons={filteredPokemons} onOpenModal={() => setShowCard(!showCard)} setSelectedPokemon={setSelectedPokemon} />}

        {filteredPokemons.length === 0 && <p className={styles.noPokemon}>Nenhum Pokemon encontrado</p>}
        <div ref={loadMoreRef} style={{ height: "20px", background: "white" }} />
      </div>

      <button onClick={ScrollToTop} className={styles.buttonTop}>
        <Icon name="IconSVGArrowUp" size={24} className={styles.buttonTopIcon} />
      </button>

      {showCard && <Card selectedPokemon={seletedPokemon} onClose={() => setShowCard(!showCard)} />}
    </div>
  );
}
