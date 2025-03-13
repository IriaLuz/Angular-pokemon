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
  pokemonNames: PokemonType[] = []; // Store the full Pokémon data
  page = 1; // Current page
  totalPokemons: number = 0; // Total Pokémon count (for pagination)
  isLoading = true; // Variable to track loading state
  notFoundMessage: string = ''; // Message for "No Pokémon Found"
  initialPage = 1; // Store the initial page to show when resetting

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.getPokemons(); // Initial load when no search query is provided
  }

  getPokemons(): void {
    this.isLoading = true; // Set loading state to true
    this.pokemonService.getAllPokemons(12, this.page).subscribe(
      (response) => {
        this.totalPokemons = response.count; // Total count of all Pokémon for pagination
        const pokemons = response.results;
        const pokemonRequests = pokemons.map((pokemon) =>
          this.pokemonService.getPokemonData(pokemon.name)
        );
        forkJoin(pokemonRequests).subscribe((fullPokemonData: PokemonType[]) => {
          this.pokemonNames = fullPokemonData;
          this.isLoading = false; // Set loading state to false after fetching data
        });
      },
      (error) => {
        console.error("Error fetching data:", error);
        this.isLoading = false; // Set loading state to false in case of error
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

  // Reset to the initial page after searching
  resetToInitialPage(): void {
    this.pokemonNames = [];
    this.page = this.initialPage;
    this.getPokemons(); // Reload Pokémon data
    this.notFoundMessage = '';
  }
}




