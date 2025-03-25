import Image from "next/image";
import { PokemonListProps } from "@/types/pokemons";
import styles from './styles.module.css'

export function PokemonList({ pokemons }: { pokemons: PokemonListProps[] }) {

  return (
    <div className={styles.content}>
      {pokemons?.map(({ name, image }, index) => (
        <button type="button" key={index} className={styles.pokemon}>
          <h2>{name}</h2>
          <Image src={image} priority onLoad={(image) => image} alt={`${index}-${name}`} width={100} height={100} className={styles.image} />
        </button>
      ))}
    </div>
  )
}