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
  pokemonNames: PokemonType[] = []; // Original list of Pokémon
  filteredPokemons: PokemonType[] = []; // Filtered list based on search
  page = 1; // Current page
  totalPokemons: number = 0; // Total number of original Pokémon
  totalFilteredPokemons: number = 0; // Total number of filtered Pokémon
  isLoading = false;
  notFoundMessage: string = '';
  initialPage = 1;

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.getPokemons(); // Get original Pokémon list on page load
  }

  // Get all Pokémon for the original list with pagination
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

  // Handle search results coming from the SearchComponent
  onSearch(queryPokemons: PokemonType[]): void {
    this.filteredPokemons = queryPokemons;
    this.totalFilteredPokemons = queryPokemons.length;
    this.page = 1; // Reset to first page when new search is performed
    if (queryPokemons.length === 0) {
      this.notFoundMessage = 'No Pokémon found matching your search.';
    } else {
      this.notFoundMessage = '';
    }
  }

  // Reset to original Pokémon list and pagination
  resetToInitialPage(): void {
    this.filteredPokemons = [];
    this.page = this.initialPage;
    this.getPokemons();
    this.notFoundMessage = '';
  }

  // Return the list to show based on whether search is active
  get displayedPokemons(): PokemonType[] {
    return this.filteredPokemons.length > 0 ? this.filteredPokemons : this.pokemonNames;
  }

  // Return the total count for pagination based on whether search is active
  get totalItems(): number {
    return this.filteredPokemons.length > 0 ? this.totalFilteredPokemons : this.totalPokemons;
  }
}






