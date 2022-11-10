import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { pokemonMockTransformed, pokemonMockResponse } from './mockData';

import {
  PokemonDataService,
  transformToPokemonType,
} from './pokemonData.service';
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
    service.getPokemon().subscribe((pokemonData) => {
      expect(pokemonData).toEqual(pokemonMockTransformed);
      done();
    });
    // Verify the matched URL get called in the GET API else it throws errors.'
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    // Verify that the request called is GET HTTP method only.
    expect(req.request.method).toEqual('GET');
    //Ensures the correct data was returned using Subscribe callback.
    req.flush(pokemonMockResponse);
    // httpMock.verify();
  });

  it('Should transformer retrieve the right data', () => {
    expect(transformToPokemonType(pokemonMockResponse)).toEqual(
      pokemonMockTransformed
    );
  });
});
