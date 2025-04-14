function AbbreviationName(name: string) {
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

export { AbbreviationName }
