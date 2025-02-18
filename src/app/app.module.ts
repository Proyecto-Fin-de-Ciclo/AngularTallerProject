import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PagesNotFoundComponent } from './pages-not-found/pages-not-found.component';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { BarraCierreComponent } from './components/barra-cierre/barra-cierre.component';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PagesNotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule,
    PagesModule,
    AppRoutingModule,
    HttpClientModule,
    BarraCierreComponent, // Agregar la barra de cierre al módulo principal
  ],
  providers: [provideClientHydration(withEventReplay()), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
