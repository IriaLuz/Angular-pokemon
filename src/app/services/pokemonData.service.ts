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
    src: pokemonData.sprites.other['official-artwork'].front_default,
  };
}

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAllPokemons() {
    return this.http.get(`${this.apiUrl}/pokemon?limit=12`);
  }

  getPokemonData(name: string): Observable<PokemonType> {
    const data = this.http
      .get<CardType>(`${this.apiUrl}/pokemon/${name}`)
      .pipe(map(transformToPokemonType));
    return data;
  }
}
