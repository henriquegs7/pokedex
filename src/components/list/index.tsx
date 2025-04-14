import Image from "next/image";
import { png } from "@/assests";
import { useFavorites } from "@/hooks/useFavorites";
import { PokemonListProps } from "@/types/pokemons";
import { FormatName } from "@/utils/FormatName";
import { Icon } from "../icon";

import styles from './styles.module.css'

type ListProps = {
  pokemonsList: PokemonListProps[]
  onOpenModal: (value: boolean) => void
  setSelectedPokemon: (value: PokemonListProps) => void
}

export function List({ pokemonsList, onOpenModal, setSelectedPokemon }: ListProps) {
  const toggleFavorite = useFavorites();

  function handleOpenModal(pokemon: PokemonListProps) {
    onOpenModal(true);
    setSelectedPokemon(pokemon);
  };

  return (
    <div className={styles.content}>
      {pokemonsList?.map((pokemon: PokemonListProps) => {
        const { id, name, image, isFavorite } = pokemon;
        const nameIcon = isFavorite ? "IconSVGHeartSolid" : "IconSVGHeartRegular"
        const starClass = isFavorite ? styles.iconStarFavouriteActive : styles.iconStarFavourite;

        return(
        <div key={id} className={styles.pokemon}>
          <div className={styles.idContainer}>
            <button 
              type="button" 
              onClick={() => toggleFavorite(pokemon)} 
              className={styles.buttonTopIcon}>
              <Icon name={nameIcon} size={16} className={starClass} />
            </button>
            <p className={styles.id}>#{id}</p>
          </div>
          <button 
            type="button" 
            key={id} 
            className={styles.buttonDetails} 
            onClick={() => handleOpenModal(pokemon)}>
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
        </div>
      )})}
    </div>
  )
}