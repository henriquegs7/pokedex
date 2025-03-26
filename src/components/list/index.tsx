import Image from "next/image";
import { png } from "@/assests";
import { PokemonListProps } from "@/types/pokemons";
import { FormatName } from "@/utils/FormatName";
import styles from './styles.module.css'

type ListProps = {
  pokemons: PokemonListProps[]
  onOpenModal: (value: boolean) => void
  setSelectedPokemon: (value: PokemonListProps) => void
}

export function List({ pokemons, onOpenModal, setSelectedPokemon }: ListProps) {

  function handleOpenModal(name: string, image: string, data: PokemonListProps['data']) {
    onOpenModal(true);
    setSelectedPokemon({ name, image, data, id: data.id });
  };

  return (
    <div className={styles.content}>
      {pokemons?.map(({ name, image, data, id }) => (
        <button type="button" key={id} className={styles.pokemon} onClick={() => handleOpenModal(name, image, data)}>
          <p className={styles.id}>#{data.id}</p>
          <Image
            src={image}
            alt={name || "Imagem do Pokemon"}
            width={60}
            height={60}
            className={styles.image}
            loading="lazy"
            overrideSrc={png["IconPNGShadowPokemon"].src}
          />
          <h2 className={styles.name}>{FormatName(name)}</h2>
        </button>
      ))}
    </div>
  )
}