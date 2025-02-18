import { User } from '../../core/user';
import { LibrosService } from './../../services/libros.service';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LibrosComponent implements OnInit {
libros:Libro[]=[];
  constructor(private LibrosService:LibrosService) { }

  ngOnInit(): void {
    this.LibrosService.getLibros().subscribe((libros:Libro[]) => {
      this.libros=libros;
      console.log(this.libros);
    })
  }

}
