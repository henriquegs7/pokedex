import { PokemonListProps } from "@/types/pokemons";

const DB_NAME = "PokedexDB";
const STORE_NAME_POKEMON = "pokemons";
const DB_VERSION_POKEMON = 1;

function openDB(dbName: string, dbVersion: number, storeName: string) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequest).result;

      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

async function savePokemonToDB(pokemons: PokemonListProps[]) {
  const db = await openDB(DB_NAME, DB_VERSION_POKEMON, STORE_NAME_POKEMON);
  const transaction = (db as IDBDatabase).transaction(STORE_NAME_POKEMON, "readwrite");
  const store = transaction.objectStore(STORE_NAME_POKEMON);

  for (const pokemon of pokemons) {
    const request = store.get(pokemon.id);

    request.onsuccess = () => {
      if (!request.result) {
        store.put(pokemon);
      }
    };
  }
};

async function getPokemonsFromDB(): Promise<PokemonListProps[]> {
  const db = await openDB(DB_NAME, DB_VERSION_POKEMON, STORE_NAME_POKEMON);

  return new Promise<PokemonListProps[]>((resolve, reject) => {
    const transaction = (db as IDBDatabase).transaction(STORE_NAME_POKEMON, "readonly");
    const store = transaction.objectStore(STORE_NAME_POKEMON);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Erro ao buscar Pokémons do IndexedDB");
  });
};

export { savePokemonToDB, getPokemonsFromDB };