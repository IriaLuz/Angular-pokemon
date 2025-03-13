import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from './../services/pokemonData.service';
import { PokemonType } from '../card/card';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  pokemonNames: PokemonType[] = [];
  page = 1;
  totalPokemons: number = 0;
  isLoading = false;
  notFoundMessage: string = '';

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.isLoading = true;
    this.pokemonService.getAllPokemons(12, this.page).subscribe(
      (response) => {
        this.totalPokemons = response.count;
        const pokemons = response.results;
        const pokemonRequests = pokemons.map((pokemon) =>
          this.pokemonService.getPokemonData(pokemon.name)
        );
        forkJoin(pokemonRequests).subscribe((fullPokemonData: PokemonType[]) => {
          this.pokemonNames = fullPokemonData;
          this.isLoading = false;
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch(queryPokemons: PokemonType[]): void {
    if (queryPokemons.length === 0) {
      this.notFoundMessage = 'No Pokémon found matching your search.';
    } else {
      this.notFoundMessage = '';
    }
    this.pokemonNames = queryPokemons;
    this.page = 1;
    this.totalPokemons = queryPokemons.length;
  }

  resetToInitialPage(): void {
    this.pokemonNames = [];
    this.page = 1;
    this.getPokemons();
    this.notFoundMessage = '';
  }
}





