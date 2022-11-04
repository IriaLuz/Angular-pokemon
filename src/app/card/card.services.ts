import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CardType } from './card';

import {
  HttpErrorHandler,
  HandleError,
} from '../../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable()
export class CardService {
  cardUrl = 'https://pokeapi.co/api/v2/pokemon/1'; // URL to web api
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CardService');
  }

  /** GET heroes from the server */
  getCard(): Observable<CardType[]> {
    return this.http
      .get<CardType[]>(this.cardUrl)
      .pipe(catchError(this.handleError('getCard', [])));
  }
}
