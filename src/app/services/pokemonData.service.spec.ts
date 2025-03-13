import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { pokemonMockTransformed, pokemonMockResponse } from './mockData';

import { PokemonDataService } from './pokemonData.service';
import { HttpClient } from '@angular/common/http';

describe('PokemonDataService', () => {
  let service: PokemonDataService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonDataService],
    });
    service = TestBed.inject(PokemonDataService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should call the HTTP method for the given API', (done: DoneFn) => {
    service
      .getPokemonData('bulbasaur') 
      .subscribe((pokemonData) => {
        expect(pokemonData).toEqual(pokemonMockTransformed); 
        done(); 
      });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    ); // 2.
    expect(req.request.method).toEqual('GET'); 
    req.flush(pokemonMockResponse); 
  });
});
