import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { API_URL } from '../app-tokens'; // Import the token
import { AllPokemonsType, CardType, PokemonType } from '../card/card';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  private cache = new Map<string, PokemonType>();

  constructor(private http: HttpClient, @Inject(API_URL) private apiUrl: string) {} 

  getAllPokemons(limit: number, page: number): Observable<AllPokemonsType> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', ((page - 1) * limit).toString());
  
    return this.http.get<AllPokemonsType>(`${this.apiUrl}/pokemon`, { params })
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

  getPokemonsByName(name: string): Observable<PokemonType[]> {
    const params = new HttpParams().set('name', name); 
    return this.http.get<AllPokemonsType>(`${this.apiUrl}/pokemon`, { params }).pipe(
      switchMap(response => {
       
        const pokemonRequests = response.results
          .filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(name.toLowerCase())
          )
          .map(pokemon => this.http.get<CardType>(pokemon.url).pipe(
            map(transformToPokemonType), 
            catchError(this.handleError) 
          ));
          
        
        return forkJoin(pokemonRequests); 
      }),
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


