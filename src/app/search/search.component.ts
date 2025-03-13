import { Component, Output, EventEmitter } from '@angular/core';
import { PokemonDataService } from './../services/pokemonData.service';
import { PokemonType } from '../card/card';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchText: string = '';
  @Output() searchQuery = new EventEmitter<PokemonType[]>();
  
  @Output() searchTextLenght = new EventEmitter<number>();
  

  constructor(private pokemonService: PokemonDataService) {}

  onSearch(): void {
    this.searchTextLenght.emit(this.searchText.length)
    if (this.searchText.trim()) {
      this.pokemonService.getAllPokemons(100, 1).subscribe(
        (response) => {
          const filteredNames = response.results
            .filter((pokemon) => pokemon.name.toLowerCase().startsWith(this.searchText.toLowerCase()))
            .map((pokemon) => pokemon.name);

          if (filteredNames.length > 0) {
            this.pokemonService.getPokemonsByName(filteredNames).subscribe(
              (pokemons) => {
                this.searchQuery.emit(pokemons);
              },
              (error) => {
                console.error('Error fetching Pokémon details:', error);
                this.searchQuery.emit([]);
              }
            );
          } else {
            this.searchQuery.emit([]); 
          }
        },
        (error) => {
          console.error('Error fetching Pokémon names:', error);
          this.searchQuery.emit([]);
        }
      );
    } else {
      this.searchQuery.emit([]); 
    }
  }


  clearSearch(): void {
    this.searchText = '';
    this.searchQuery.emit([]);  
  }
}






