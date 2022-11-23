import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PokemonType } from '../card/card';
import { PokemonDataService } from '../services/pokemonData.service';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.scss'],
})
export class DescriptionPageComponent implements OnInit, OnDestroy {
  @Input() pokemonName: string = '';
  destroy$ = new Subject<void>();

  pokemon: PokemonType = { name: '', weight: 0, height: 0, src: '' };

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.onGetPokemonData();
  }

  onGetPokemonData(): void {
    this.pokemonService
      .getPokemonData('charmander')
      .pipe(takeUntil(this.destroy$))
      .subscribe((pokemonData) => {
        (this.pokemon = pokemonData), (error: any) => console.log(error);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
