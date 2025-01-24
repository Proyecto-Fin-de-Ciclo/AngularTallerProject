import { LibrosService } from './../../services/libros.service';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  standalone: false,

  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {

  constructor(private LibrosService:LibrosService) { }

  ngOnInit(): void {
    this.LibrosService.getLibros().subscribe(libros => {
      console.log(libros);
    })
  }

}
