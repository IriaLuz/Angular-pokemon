import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonDataService } from './../services/pokemonData.service';
import { PokemonType } from '../card/card';
import { forkJoin } from 'rxjs';
import { SearchComponent } from '../search/search.component';  

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  pokemonNames: PokemonType[] = []; 
  filteredPokemons: PokemonType[] = []; 
  page = 1; 
  totalPokemons: number = 0; 
  totalFilteredPokemons: number = 0; 
  isLoading = false;
  notFoundMessage: string = '';
  initialPage = 1;

  @ViewChild(SearchComponent) searchComponent!: SearchComponent;  

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
    this.filteredPokemons = queryPokemons;
    this.totalFilteredPokemons = queryPokemons.length;
    this.page = 1; 
    if (queryPokemons.length === 0) {
      this.notFoundMessage = 'No Pokémon found matching your search.';
    } else {
      this.notFoundMessage = '';
    }
  }

  resetToInitialPage(): void {
    this.filteredPokemons = [];
    this.page = this.initialPage;
    this.getPokemons();
    this.notFoundMessage = '';

    if (this.searchComponent) {
      this.searchComponent.clearSearch();
    }
  }

  get displayedPokemons(): PokemonType[] {
    return this.filteredPokemons.length > 0 ? this.filteredPokemons : this.pokemonNames;
  }

  get totalItems(): number {
    return this.filteredPokemons.length > 0 ? this.totalFilteredPokemons : this.totalPokemons;
  }
}







