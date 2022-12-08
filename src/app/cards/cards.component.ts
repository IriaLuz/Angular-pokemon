import { AllPokemonsType, Result } from './../types';
import { PokemonDataService } from './../services/pokemonData.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  pokemonNames: string[] = [];
  page = 1;
  totalPokemons: number = 0;
  name: string[] = [];

  filteredPokemonNames: string[] = [];
  searchText: string = '';

  constructor(private PokemonDataService: PokemonDataService) {
    this.PokemonDataService.searchString.subscribe((data) => {
      this.searchText = data;
    });

    this.PokemonDataService.filteredPokeNames.subscribe((data) => {
      console.log('DATA: ', data);
      this.filteredPokemonNames = data;
    });
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.PokemonDataService.getAllPokemons(
      environment.pokemonsPerPage,
      this.page
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: AllPokemonsType) => {
        this.totalPokemons = response.count;

        response.results.forEach((result: Result) => {
          this.pokemonNames.push(result.name);
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
