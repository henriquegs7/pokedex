import Image from 'next/image'
import { PokemonListProps } from '@/types/pokemons'
import { FormatName } from '@/utils/FormatName'
import styles from './styles.module.css'

type ModalProps = {
  selectedPokemon: PokemonListProps
  onClose: () => void
}

export function Modal({ selectedPokemon, onClose }: ModalProps) {
  const { name, image, data } = selectedPokemon

  const abbreviationName = (name: string) => {
    const names = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SATK',
      'special-defense': 'SDEF',
      speed: 'SPD'
    }
    return names[name as keyof typeof names] || name
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.pokemonCard}>
          <div className={styles.cardHeader}>
            <button className={styles.backButton} onClick={onClose}>←</button>
            <h1 className={styles.pokemonName}>{FormatName(name)}</h1>
            <span className={styles.pokemonNumber}>#{data.id}</span>
          </div>

          <div className={styles.pokemonImageContainer}>
            <Image src={image} alt={name} height={100} width={100} className={styles.pokemonImage} />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.typeBadges}>
              {data?.types?.map(({ type }) => <p key={type.name}>{FormatName(type.name)}</p>)}
            </div>

            <h2 className={styles.sectionTitle}>About</h2>

            <div className={styles.pokemonStats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{data?.weight} kg</div>
                <div className={styles.statLabel}>Weight</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statValue}>{data?.height} m</div>
                <div className={styles.statLabel}>Height</div>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <div className={styles.statValue}>
                  {data?.abilities?.map(({ ability }) => <p key={ability.name}>{FormatName(ability.name)}</p>)}
                </div>
                <div className={styles.statLabel}>Moves</div>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Base Stats</h2>

            <div className={styles.baseStats}>
              {data?.stats?.map((stat) => (
                <div className={styles.statRow} key={stat.stat.name}>
                  <div className={styles.statName}>{abbreviationName(stat.stat.name)}</div>
                  <div className={styles.statNumber}>{stat.base_stat}</div>
                  <div className={styles.statBar}>
                    <div className={styles.statFill} style={{ width: `${(stat.base_stat / 255) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}