import { Observable } from 'rxjs';
import { CardType } from './card/card';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  constructor(private http: HttpClient) {}
  getData(): Observable<CardType> {
    return this.http.get<CardType>('https://pokeapi.co/api/v2/pokemon/1');
  }
}
