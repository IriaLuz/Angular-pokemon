import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AllPokemonsType, CardType, PokemonType } from '../card/card';
import { environment } from '../../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private apiUrl = environment.apiUrl;
  private cache = new Map<string, PokemonType>(); // Cache storage

  constructor(private http: HttpClient) {}

  getAllPokemons(limit: number, page: number): Observable<AllPokemonsType> {
    return this.http
      .get<AllPokemonsType>(
        `${this.apiUrl}/pokemon?limit=${limit}&offset=${(page - 1) * limit}`
      )
      .pipe(catchError(this.handleError));
  }

  getPokemonData(name: string): Observable<PokemonType> {
    if (this.cache.has(name)) {
      return of(this.cache.get(name)!); 
    }

    return this.http.get<CardType>(`${this.apiUrl}/pokemon/${name}`).pipe(
      map(transformToPokemonType),
      tap((data) => this.cache.set(name, data)), 
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }
  
    console.error(`[PokemonDataService] ${errorMessage}`);
    return throwError(() => new Error(errorMessage));
  }
}

