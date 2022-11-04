import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon/1');
  }
}
