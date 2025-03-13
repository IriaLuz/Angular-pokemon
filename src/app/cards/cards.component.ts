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
  isLoading = true;
  notFoundMessage: string = ''; // Message for "No Pokémon Found"

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.getPokemons(); // Initial load when no search query is provided
  }

  getPokemons(): void {
    this.isLoading = true;
    this.pokemonService.getAllPokemons(12, this.page).subscribe(
      (response) => {
        this.totalPokemons = response.count; // Total count of all Pokémon for pagination
        // Map through the results and fetch full Pokémon data
        const pokemons = response.results;
        const pokemonRequests = pokemons.map((pokemon) =>
          this.pokemonService.getPokemonData(pokemon.name)
        );
        // Use forkJoin to wait for all the requests to finish
        forkJoin(pokemonRequests).subscribe((fullPokemonData: PokemonType[]) => {
          this.pokemonNames = fullPokemonData; // Set the full Pokémon data
          this.isLoading = false;
        });
      },
      (error) => {
        console.error("Error fetching data:", error);
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
    this.pokemonNames = queryPokemons; // Update displayed Pokémon with search results
    this.page = 1; // Reset to the first page when search is triggered
    this.totalPokemons = queryPokemons.length; // Set total count to length of search results
  }
}



