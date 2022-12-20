import { CardType, PokemonType, AllPokemonsType } from '../types';

export function mapGetAllPokemons({
  count,
  next,
  previous,
  results,
}: AllPokemonsType): AllPokemonsType {
  return {
    count: count,
    next: next,
    previous: previous,
    results: results,
  };
}

export function transformToPokemonType({
  name,
  weight,
  height,
  sprites,
  stats,
  types,
}: CardType): PokemonType {
  return {
    name: name,
    weight: weight,
    height: height,
    src: sprites.other['official-artwork'].front_default,
    stats: stats,
    types: types,
  };
}

export function tranformToPokemonNamesArray(
  pokemons: AllPokemonsType
): string[] {
  let names: string[] = [];
  pokemons.results.forEach((result) => {
    names.push(result.name);
  });
  return names;
}
