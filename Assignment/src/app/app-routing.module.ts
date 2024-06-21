import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';

const routes: Routes = [
  {
    path:"", redirectTo: "characters", pathMatch: "full"
  },
  {
    path: "characters", component: HomepageContentComponent
  },
  {
    path: "characters/:id", component: CharacterDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
