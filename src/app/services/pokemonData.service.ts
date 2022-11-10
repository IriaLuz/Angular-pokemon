import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardType, PokemonType } from '../card/card';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

export function transformToPokemonType(pokemonData: CardType): PokemonType {
  return {
    name: pokemonData.name,
    weight: pokemonData.weight,
    height: pokemonData.height,
    src: pokemonData.sprites.other.dream_world.front_default,
  };
}

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getPokemon(): Observable<PokemonType> {
    const data = this.http
      .get<CardType>(`${this.apiUrl}/pokemon/1`)
      .pipe(map(transformToPokemonType));
    return data;
  }
}
