import { CardType, PokemonType, AllPokemonsType } from '../types';

export function mapGetAllPokemons(
  allPokemonsType: AllPokemonsType
): AllPokemonsType {
  return {
    count: allPokemonsType.count,
    next: allPokemonsType.next,
    previous: allPokemonsType.previous,
    results: allPokemonsType.results,
  };
}

export function transformToPokemonType(pokemonData: CardType): PokemonType {
  return {
    name: pokemonData.name,
    weight: pokemonData.weight,
    height: pokemonData.height,
    src: pokemonData.sprites.other['official-artwork'].front_default,
    stats: pokemonData.stats,
    types: pokemonData.types,
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
