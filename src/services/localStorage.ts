import { PokemonListProps } from "@/types/pokemons";

function setStorage(key: string, value: PokemonListProps[]) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(value));
};

function getStorage(key: string) {
  if (typeof window === 'undefined') return null;

  const value = localStorage.getItem(key);
  
  return value ? JSON.parse(value) : null;
};

function removeStorage(key: string) {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(key);
};

function clearStorage() {
  if (typeof window === 'undefined') return;

  localStorage.clear();
};

export { setStorage, getStorage, removeStorage, clearStorage }