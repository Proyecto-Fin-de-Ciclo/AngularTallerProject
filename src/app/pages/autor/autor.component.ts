import { Autor } from './../../core/autor';
import { AutorService } from './../../services/autor.service';
import { Component, OnInit } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginAuthService } from '../../services/loginAuth.service';

@Component({
  selector: 'app-autor',
  standalone: false,

  templateUrl: './autor.component.html',
  styleUrl: './autor.component.css'
})
export class AutorComponent implements OnInit {
[x: string]: any;
  autores:Autor[]=[];
  selectedAutor: any;
  errorMessage: string = '';
  user: any;
  admin=false;
  DataViewModule: any;
  autorSeleccionado!:Autor;
  autorAuxAdd!:Autor;
  autorSelectedDelete!:Autor;
  libroForm!: FormGroup;
  libroFormAdd!: FormGroup;
  displayModify: boolean = false;
  displayDialog: boolean = false;
  displayAdd: boolean = false;
  displayError: boolean = false;
  displayDelete: boolean = false;
    constructor(private autorService:AutorService,private fb: FormBuilder,private loginAuthService:LoginAuthService) { }

    ngOnInit(): void {
      this.user = this.loginAuthService.getUser();
      if(this.user.rol=="admin"){
        this.admin=true;
      }
      this.autorService.getAutores().subscribe((autor:Autor[]) => {
        this.autores=autor;
        console.log(this.autores);
      })
  this.libroForm = this.fb.group({
            id : [0],
            nombre: [''],
            imgName: [''],
            descripcion: ['']
          });

    this.libroFormAdd = this.fb.group({
      id : [0],
      nombre: [''],
      imgName: [''],
      descripcion: ['']
    });

}
    showAutorDetails(autor: any): void {
      this.selectedAutor = autor;
      this.displayDialog = true;
    }

    closeDialog(): void {
      this.displayDialog = false;
      this.displayModify = false;
    }

    mostrarCamposAutor(autor: any): void {
      this.selectedAutor = autor;
      this.displayModify = true;
      this.libroForm.patchValue({
        id: autor.id,
        nombre: autor.nombre,
        imgName: autor.imgName,
        descripcion: autor.descripcion});
        console.log('autor modificado:', this.libroForm.value);


    }
    modificarAutor(autor:any): void {
      if (this.libroForm.valid) {
        autor = this.libroForm.value;
        console.log('Libro modificado:', autor);
        // Aquí puedes manejar la lógica para guardar los cambios, como llamar a un servicio
        this.autorService.putAutor(autor).subscribe({
          next: (response: any) => {
            console.log('Libro actualizado:', response);
            // Actualiza la lista de libros o cualquier otra lógica que necesites
            this.displayModify = false; // Cierra el formulario
            autor = null;
          },
          error: (err: any) => {
            console.error('Error actualizando el libro:', err);
          }
        });
      }
    }
    mostrarCamposAutorAdd(): void {
      this.autorAuxAdd = this.libroFormAdd.value;
      this.displayAdd = true;
      this.libroFormAdd.patchValue({
        id: this.autorAuxAdd.id,
        nombre: this.autorAuxAdd.nombre,
        imgName: this.autorAuxAdd.imgName,
        descripcion: this.autorAuxAdd.descripcion});
        console.log('autor modificado:', this.libroForm.value);
  }
  addAutor(autor:any): void {
    if (this.libroFormAdd.valid) {
      autor = this.libroFormAdd.value;
  this.autorService.postAutor(autor).subscribe({
    next: (response: any) => {
      console.log('Libro actualizado:', response);
      this.autores.push(autor)
      this.displayAdd = false; // Cierra el formulario
      autor = null;
    },
    error: (err: any) => {
      console.error('Error actualizando el libro:', err);
    }
  });
}
}
deleteAutor(autor: any): void {
  this.autorService.deleteLibroByAutor(autor.id).subscribe({
    next: (response: any) => {
      console.log('Libro eliminado:', response);
      this.autores = this.autores.filter((l: any) => l.id !== autor.id);
      this.selectedAutor = null;
    },
    error: (err: HttpErrorResponse) => {
      console.error('Error eliminando el autor:', err);
      if (err.status === 500) {
        this.errorMessage = 'No se puede borrar el autor porque existen libros asociados. Primero borre los libros.';
        this.displayError = true;
      }
    }
  });
  this.displayDelete = false;
}

deleteConfirm(autor: any): void {
  this.autorSelectedDelete = autor;
  this.displayDelete = true;

}
}
