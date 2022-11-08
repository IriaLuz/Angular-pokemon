import { TestBed } from '@angular/core/testing';

import { PokemonDataService } from './pokemonData.service';

describe('PokemonDataService', () => {
  let service: PokemonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
