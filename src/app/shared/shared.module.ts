import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
//Prime-NG
import { ButtonModule } from 'primeng/button';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {DockModule} from 'primeng/dock';
import { LoginComponent } from "../login/login.component";

@NgModule({
  declarations: [
    BreadCrumbComponent,
    BarraNavegacionComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    BreadcrumbModule,
    DockModule,
    LoginComponent
],
  exports: [
    BreadCrumbComponent,
    BarraNavegacionComponent,
  ]
})
export class SharedModule { }

