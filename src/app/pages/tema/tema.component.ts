import { TemaService } from './../../services/tema.service';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../../core/tema';
import { DataViewModule } from 'primeng/dataview';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginAuthService } from '../../services/loginAuth.service';

@Component({
  selector: 'app-autor',
  standalone: false,

  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})
export class TemaComponent implements OnInit {
[x: string]: any;
  temas:Tema[]=[];
  selectedTema: any;
  DataViewModule: any;
  errorMessage: string = '';
  temaSelectedDelete!:Tema;
    temaSeleccionado!:Tema;
    user: any;
    admin=false;
    temaAuxAdd!:Tema;
    temaForm!: FormGroup;
    temaFormAdd!: FormGroup;
    displayModify: boolean = false;
    displayDialog: boolean = false;
    displayAdd: boolean = false;
    displayError: boolean = false;
    displayDelete: boolean = false;
    constructor(private temaService:TemaService, private fb: FormBuilder,private loginAuthService:LoginAuthService) { }

    ngOnInit(): void {
      this.user = this.loginAuthService.getUser();
      if(this.user.rol=="admin"){
        this.admin=true;
      }
      this.temaService.getTema().subscribe((tema:Tema[]) => {
        this.temas=tema;
        console.log(this.temas);
      })
      this.temaForm = this.fb.group({
        id : [0],
        nombre: [''],
        imgName: [''],
        descripcion: ['']
      });

      this.temaFormAdd = this.fb.group({
      id : [0],
      nombre: [''],
      imgName: [''],
      descripcion: ['']
});

    }
    showTemaDetails(tema: any): void {
      this.selectedTema = tema;
      this.displayDialog = true;
    }

    closeDialog(): void {
      this.displayDialog = false;
    }
    mostrarCamposTema(tema: any): void {
      this.selectedTema = tema;
      this.displayModify = true;
      this.temaForm.patchValue({
        id: tema.id,
        nombre: tema.nombre,
        imgName: tema.imgName,
        descripcion: tema.descripcion});
        console.log('autor modificado:', this.temaForm.value);

  }
  modificarTema(tema:any): void {
    if (this.temaForm.valid) {
      tema = this.temaForm.value;
      console.log('Libro modificado:', tema);
      // Aquí puedes manejar la lógica para guardar los cambios, como llamar a un servicio
      this.temaService.putTema(tema).subscribe({
        next: response => {
          console.log('Libro actualizado:', response);
          // Actualiza la lista de libros o cualquier otra lógica que necesites
          this.displayModify = false; // Cierra el formulario
          tema = null;
        },
        error: err => {
          console.error('Error actualizando el libro:', err);
        }
      });
    }
  }
  mostrarCamposTemaAdd(): void {
    this.temaAuxAdd = this.temaFormAdd.value;
    this.displayAdd = true;
    this.temaFormAdd.patchValue({
      id: this.temaAuxAdd.id,
      nombre: this.temaAuxAdd.nombre,
      imgName: this.temaAuxAdd.imgName,
      descripcion: this.temaAuxAdd.descripcion});
      console.log('autor modificado:', this.temaFormAdd.value);
}
addTema(tema:any): void {
  if (this.temaFormAdd.valid) {
    tema = this.temaFormAdd.value;
this.temaService.postTema(tema).subscribe({
  next: response => {
    console.log('Libro actualizado:', response);
    this.temas.push(tema)
    this.displayAdd = false; // Cierra el formulario
    tema = null;
  },
  error: err => {
    console.error('Error actualizando el libro:', err);
  }
});
}
}
deleteTema(tema: any): void {
  this.temaService.deleteTema(tema.id).subscribe({
    next: response => {
      console.log('Libro eliminado:', response);
      this.temas = this.temas.filter((l: any) => l.id !== tema.id);
      this.selectedTema = null;
    },
    error: (err: HttpErrorResponse) => {
      console.error('Error eliminando el autor:', err);
      if (err.status === 500) {
        this.errorMessage = 'No se puede borrar el tema porque existen libros asociados. Primero borre los libros.';
        this.displayError = true;
      }
    }
  });
  this.displayDelete = false;
}

deleteConfirm(autor: any): void {
  this.temaSelectedDelete = autor;
  this.displayDelete = true;

}
}

