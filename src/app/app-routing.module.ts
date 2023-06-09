import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { GenresPageComponent } from './genres-page/genres-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  {
    path: 'mainpage', component: MainPageComponent
  },
  {
    path: 'search', component: SearchPageComponent
  },
  {
    path: 'genres', component: GenresPageComponent
  },
  {
    path: 'profile', component: ProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
