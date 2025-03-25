import Image from "next/image";
import styles from './styles.module.css'

export type PokemonListProps = {
  name: string
  image: string
  data: any
}

export function PokemonList({pokemons}: {pokemons: PokemonListProps[]}) {

  return (
    <div className={styles.content}>
      {pokemons?.map(({name, image}) => (
        <button key={name} className={styles.pokemon}>
          <h2>{name}</h2>
          <Image src={image} alt={name} width={100} height={100}  />
        </button>
      ))}
    </div>
  )
}