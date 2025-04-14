type PokemonListProps = {
  id: number
  name: string
  image: string
  isFavorite: boolean
  data: {
    height: number
    weight: number
    types: { type: { name: string } }[]
    stats: { stat: { name: string }, base_stat: number }[]
    abilities: { ability: { name: string } }[]
  }
}

type PokemonNameProps = {
  name: string
}

export type { PokemonListProps, PokemonNameProps }