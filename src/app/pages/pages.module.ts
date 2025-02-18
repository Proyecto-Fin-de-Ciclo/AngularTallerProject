import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { LibrosComponent } from './libros/libros.component';
import { TemaComponent } from './tema/tema.component';
import { AutorComponent } from './autor/autor.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { ComponentsComponent } from '../components/components.component';
import{CardModule} from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    MainPageComponent,
    LibrosComponent,
    TemaComponent,
    AutorComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsComponent,
    CardModule,
    DialogModule,
    DropdownModule,
    DataViewModule,
    ReactiveFormsModule

]
})
export class PagesModule { }
