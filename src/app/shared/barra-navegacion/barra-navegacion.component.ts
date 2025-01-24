import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-navegacion',
  standalone: false,

  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.css'
})

export class BarraNavegacionComponent implements OnInit {
  navBar: MenuItem[] = [];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.navBar= [
      {
        label: 'Libros',
        icon: "assets/iconos/libros.png",
        command:()=>{ this.router.navigateByUrl('main/libros') }
      },
      {
        label: 'Autor',
        icon: "assets/iconos/autor.png",
        command:()=>{ this.router.navigateByUrl('main/autores') }
      },
      {
        label: 'Temas',
        icon: "assets/iconos/temas.png",
        command:()=>{ this.router.navigateByUrl('main/temas') }
      },

    ];
}
}
