import Image from "next/image";
import { PokemonListProps } from "@/types/pokemons";
import { FormatName } from "@/utils/FormatName";
import styles from './styles.module.css'

type ListProps = {
  pokemons: PokemonListProps[]
  onOpenModal: (value: boolean) => void
  setSelectedPokemon: (value: PokemonListProps) => void
}

export function PokemonList({ pokemons, onOpenModal, setSelectedPokemon }: ListProps) {

  const handleOpenModal = (name: string, image: string, data: PokemonListProps['data']) => {
    onOpenModal(true);
    setSelectedPokemon({ name, image, data });
  };

  return (
    <div className={styles.content}>
      {pokemons?.map(({ name, image, data }, index) => (
        <button type="button" key={index} className={styles.pokemon} onClick={() => handleOpenModal(name, image, data)}>
          <p className={styles.id}>#{data.id}</p>
          <Image src={image} priority onLoad={(image) => image} alt={`${index}-${name}`} width={80} height={80} className={styles.image} />
          <h2 className={styles.name}>{FormatName(name)}</h2>
        </button>
      ))}
    </div>
  )
}