import { PokemonDataService } from '../services/pokemonData.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonType } from './card';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() pokemonName: string = '';
  destroy$ = new Subject<void>();

  pokemon: PokemonType = { name: '', weight: 0, height: 0, src: '' };

  constructor(private pokemonService: PokemonDataService) {}

  ngOnInit(): void {
    this.onGetPokemonData();
  }

  onGetPokemonData(): void {
    this.pokemonService
      .getPokemonData(this.pokemonName)
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
