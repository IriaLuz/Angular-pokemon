import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { DescriptionPageComponent } from './description-page/description-page.component';
const routes: Routes = [
  { path: 'pokemon/:name', component: DescriptionPageComponent },
  { path: '', component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
