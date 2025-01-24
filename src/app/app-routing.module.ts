import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesModule } from './pages/pages.module';
import { TemaComponent } from './pages/tema/tema.component';
import { AutorComponent } from './pages/autor/autor.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { MainPageComponent } from './pages/main-page.component';
import { PagesNotFoundComponent } from './pages-not-found/pages-not-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'libro', component: LibrosComponent },
  { path: 'autor', component: AutorComponent },
  { path: 'tema', component: TemaComponent },
  { path: '**', component: PagesNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
