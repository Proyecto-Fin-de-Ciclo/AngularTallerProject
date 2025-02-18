import { Autor } from './../../core/autor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Libro } from '../../core/libro';
import { LibrosService } from './../../services/libros.service';
import { AutorService } from './../../services/autor.service';
import { Component,OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Formato } from '../../core/formato';
import { Edicion } from '../../core/edicion';
import { EdicionService } from '../../services/edicion.service';
import { FormatoService } from '../../services/formato.service';

@Component({
  selector: 'app-libros',
  standalone: false,

  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {
libros:Libro[]=[];
autores:Autor[]=[];
formatos:Formato[]=[];
ediciones:Edicion[]=[];
selectedLibro: any;
auxLibro!:Libro;
libroselectedDelete!:Libro;
auxLibroAdd!:Libro;
autorSeleccionado!:Autor;
libroGuardado!: Libro;
modifyLibro: any;
displayDialog: boolean = false;
displayModify: boolean = false;
displayAdd: boolean = false;
displayDelete: boolean = false;
libroForm!: FormGroup;
libroFormAdd!: FormGroup;
  constructor(private fb: FormBuilder,private LibrosService:LibrosService,private autorService:AutorService,
    private edicionService:EdicionService, private formatoService:FormatoService) { }

  ngOnInit(): void {
    this.LibrosService.getLibros().subscribe((libros:Libro[]) => {
      this.libros=libros;
      console.log(this.libros);
    })
    this.autorService.getAutores().subscribe((autores:Autor[]) => {
      this.autores=autores;
      console.log(this.autores);
    })
    this.edicionService.getEdicion().subscribe((ediciones:Edicion[]) => {
      this.ediciones=ediciones;
      console.log(this.ediciones);
    })
    this.formatoService.getFormatos().subscribe((formatos:Formato[]) => {
      this.formatos=formatos;
      console.log(this.formatos);
    })

    this.libroForm = this.fb.group({
      id : [''],
      nombre: [''],
      autor: [Autor],
      imgName: [''],
      edicion: [Edicion],
      formato: [Formato],
      precio: [''],
      ISBN: [''],
      cantidad: [''],
    });
    this.libroFormAdd = this.fb.group({
      id : [''],
      nombre: [''],
      autor: [Autor],
      imgName: [''],
      edicion: [Edicion],
      formato: [Formato],
      precio: [''],
      ISBN: [''],
      cantidad: [''],
    });
  }
  showLibroDetails(libro: any): void {
    this.selectedLibro = libro;
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.displayModify = false;
  }
  mostrarCamposLibro(libro: any): void {
    this.selectedLibro = libro;
    this.displayModify = true;
    this.libroForm.patchValue({
      id: libro.id,
      nombre: libro.nombre,
      autor: libro.autor,
      imgName: libro.imgName,
      edicion: libro.edicion.nombre,
      formato: libro.formato.nombre,
      precio: libro.precio,
      ISBN: libro.ISBN,
      cantidad: libro.cantidad});
      console.log('Libro modificado:', this.libroForm.value);


  }
  modificarLibro(): void {
    if (this.libroForm.valid) {
      this.auxLibro = this.libroForm.value;
      console.log('Libro modificado:', this.auxLibro);
      // Aquí puedes manejar la lógica para guardar los cambios, como llamar a un servicio
      this.LibrosService.postLibro(this.auxLibro).subscribe({
        next: response => {
          console.log('Libro actualizado:', response);
          // Actualiza la lista de libros o cualquier otra lógica que necesites
          this.displayModify = false; // Cierra el formulario
          this.selectedLibro = null;
        },
        error: err => {
          console.error('Error actualizando el libro:', err);
        }
      });
    }
  }
  getAutores(): void {
    this.autorService.getAutores().subscribe((autores: Autor[]) => {
      console.log('Autores:', autores);
    });
  }
  mostrarLibro(): void {
    this.displayAdd = true;
    this.auxLibroAdd =this.libroFormAdd.value;
    this.libroForm.patchValue({
      id: this.auxLibroAdd.id,
      nombre: this.auxLibroAdd.nombre,
      autor: this.auxLibroAdd.autor,
      imgName: this.auxLibroAdd.imgName,
      edicion: this.auxLibroAdd.edicion.nombre,
      formato:this.auxLibroAdd.formato.nombre,
      precio: this.auxLibroAdd.precio,
      ISBN: this.auxLibroAdd.ISBN,
      cantidad: this.auxLibroAdd.cantidad});
      console.log('Libro añadido:', this.libroForm.value);
  }
  addLibro(libro:any): void {
      if (this.libroFormAdd.valid) {
        libro = this.libroFormAdd.value;
    this.LibrosService.postLibro(libro).subscribe({
      next: response => {
        console.log('Libro actualizado:', response);
        this.libros.push(libro)
        this.displayAdd = false; // Cierra el formulario
        libro = null;
      },
      error: err => {
        console.error('Error actualizando el libro:', err);
      }
    });
  }
}
  deleteLibro(libro: any): void {
    this.LibrosService.deleteLibro(libro.id).subscribe({
      next: response => {
        console.log('Libro eliminado:', response);
        this.libros = this.libros.filter((l: any) => l.id !== libro.id);
        this.selectedLibro = null;
      },
      error: err => {
        console.error('Error eliminando el libro:', err);
      }

    });
    this.displayDelete = false;
  }
  getFormatos(): void {
    this.formatoService.getFormatos().subscribe((formatos: Formato[]) => {
      console.log('Formatos:', formatos);
    });
  }
  getEdiciones(): void {
    this.edicionService.getEdicion().subscribe((ediciones: Edicion[]) => {
      console.log('Ediciones:', ediciones);
    });
  }
  deleteConfirm(libro: any): void {
    this.libroselectedDelete = libro;
    this.displayDelete = true;
  }
}
