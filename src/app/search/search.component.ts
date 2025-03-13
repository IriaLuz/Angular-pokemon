import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { PokemonDataService } from './../services/pokemonData.service';
import { PokemonType } from '../card/card';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchQuery = new EventEmitter<PokemonType[]>(); // Emit PokemonType array to parent component

  searchText: string = ''; // Store search input value
  private searchSubject = new Subject<string>(); // Subject to handle search with debounce

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    // Handle search input with debounce
    this.searchSubject.pipe(
      // debounceTime(1000), // Wait for 5 seconds of inactivity
      switchMap((query) => {
        if (query) {
          return this.pokemonService.getPokemonsByName(query); // Get Pokémon data by name
        }
        return []; // Return empty array if no query
      })
    ).subscribe((pokemons: PokemonType[]) => {
      this.searchQuery.emit(pokemons); // Emit Pokémon results to the parent
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchText); // Trigger the search
  }
}


