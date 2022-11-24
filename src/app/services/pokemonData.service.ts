import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AllPokemonsType, CardType, PokemonType } from '../card/card';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';

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

  getAllPokemons(limit: number, page: number): Observable<AllPokemonsType> {
    return this.http
      .get<AllPokemonsType>(
        `${this.apiUrl}/pokemon?limit=${limit}&offset=${(page - 1) * limit}`
      )
      .pipe(catchError(this.handleError));
  }

  getPokemonData(name: string): Observable<PokemonType> {
    const data = this.http
      .get<CardType>(`${this.apiUrl}/pokemon/${name}`)
      .pipe(map(transformToPokemonType));
    return data;
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(
      () => new Error('a data error occurred, please try again.')
    );
  }
}
