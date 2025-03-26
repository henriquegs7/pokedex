import Image from 'next/image'
import { png } from '@/assests'
import { PokemonListProps } from '@/types/pokemons'
import { FormatName } from '@/utils/FormatName'
import { Icon } from '../icon'
import styles from './styles.module.css'

type CardProps = {
  selectedPokemon: PokemonListProps
  onClose: () => void
}

export function Card({ selectedPokemon, onClose }: CardProps) {
  const { id, name, image, data } = selectedPokemon

  function abbreviationName(name: string) {
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
    <div key={id} className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.pokemonCard}>
          <div className={styles.cardHeader}>
            <button className={styles.backButton} onClick={onClose}>
              <Icon name="IconSVGArrowBack" size={24} />
              <h1 className={styles.pokemonName}>{FormatName(name)}</h1>
            </button>
            <span className={styles.pokemonNumber}>#{data.id}</span>
          </div>

          <div className={styles.pokemonImageContainer}>
            <Image
              src={image}
              alt={name || "Imagem do Pokemon"}
              width={60}
              height={60}
              className={styles.pokemonImage}
              loading="lazy"
              overrideSrc={png["IconPNGShadowPokemon"].src}
            />
          </div>

          <div className={styles.cardContent}>
            <div className={styles.typeBadges}>
              {data?.types?.map(({ type }, i) => <p key={i}>{FormatName(type.name)}</p>)}
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
                  {data?.abilities?.map(({ ability }, i) => <p key={i}>{FormatName(ability.name)}</p>)}
                </div>
                <div className={styles.statLabel}>Moves</div>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Base Stats</h2>

            <div className={styles.baseStats}>
              {data?.stats?.map((stat, i) => (
                <div className={styles.statRow} key={i}>
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