import { PokemonDataService } from './services/pokemonData.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DescriptionPageComponent } from './description-page/description-page.component';
import { ButtonComponent } from './button/button.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsComponent,
    ToolbarComponent,
    DescriptionPageComponent,
    ButtonComponent,
    NotFoundPageComponent,
    SearchBarComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [PokemonDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
