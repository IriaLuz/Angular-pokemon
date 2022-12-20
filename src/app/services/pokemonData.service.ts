import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AllPokemonsType, CardType, PokemonType } from '../types';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';
import {
  mapGetAllPokemons,
  transformToPokemonType,
  tranformToPokemonNamesArray,
} from './type-transformers';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  private apiUrl = environment.apiUrl;
  pokeNames: string[] = [];
  public filteredPokeNames: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();
  public searchString: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.getAllPokemonNames().subscribe((response) => {
      this.pokeNames = response;
    });

    this.searchString.subscribe((data) => {
      this.filteredPokeNames.emit(
        this.getAllValidPokemons(data, this.pokeNames)
      );
    });
  }

  getAllPokemons(limit: number, page: number): Observable<AllPokemonsType> {
    return this.http
      .get<AllPokemonsType>(
        `${this.apiUrl}?limit=${limit}&offset=${(page - 1) * limit}`
      )
      .pipe(catchError(this.handleError));
  }

  getPokemonData(name: string): Observable<PokemonType> {
    const data = this.http
      .get<CardType>(`${this.apiUrl}/${name}`)
      .pipe(map(transformToPokemonType));
    return data;
  }

  getAllPokemonNames(): Observable<string[]> {
    const data = this.http
      .get<AllPokemonsType>(
        `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154`
      )
      .pipe(map(mapGetAllPokemons), catchError(this.handleError))
      .pipe(map(tranformToPokemonNamesArray));
    return data;
  }

  getAllValidPokemons(inputString: string, allNames: string[]): string[] {
    const filtered = allNames.filter((name) =>
      name.startsWith(inputString.toLowerCase())
    );
    console.log({ filtered, allNames });
    return filtered;
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(
      () => new Error('a data error occurred, please try again.')
    );
  }
}
