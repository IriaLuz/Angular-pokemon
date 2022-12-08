import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { pokemonMockTransformed, pokemonMockResponse } from '../mockData';

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
      .getPokemonData('bulbasaur') // 1.
      .subscribe((pokemonData) => {
        expect(pokemonData).toEqual(pokemonMockTransformed); // 5.
        //what is this for?
        done(); // 6.
      });

    // Verify the matched URL get called in the GET API else it throws errors.'
    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    ); // 2.
    // Verify that the request called is GET HTTP method only.
    expect(req.request.method).toEqual('GET'); // 3.
    //Ensures the correct data was returned using Subscribe callback.
    req.flush(pokemonMockResponse); // 4.
  });
});
