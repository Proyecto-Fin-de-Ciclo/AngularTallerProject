import { PedidoService } from './../services/pedido.service';
import { DatosBankService } from './../services/datosBank.service';
import { User } from './../core/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { LoginAuthService } from './../services/loginAuth.service';
import { Router } from '@angular/router';
import { CestaComponent } from "../cesta/cesta.component";
import { Libro } from '../core/libro';
import { Carrito } from '../core/carrito';
import { DatosBank } from '../core/datosBank';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  nameUser: string = '';
  passwordUser: string = '';
  selectedUser: any;
  errorMessage: string = '';
  isLogin=false;
  userSeleccionado!: User;
  contador = 0;
  userAuxAdd!: User;
  dni! :" ";
  userSelectedDelete!: User;
  userForm!: FormGroup;
  datosBankForm!: FormGroup;
  userFormAdd!: FormGroup;
  userAdd!: User;
  displayLogin: boolean = false;
  displayDialog: boolean = false;
  displayAdd: boolean = false;
  displayError: boolean = false;
  displayDelete: boolean = false;
  displayBooks: boolean = false;
  displayCompra: boolean = false;
  cantidadLibros = 0;
  carrito!:Carrito;
  libros:Libro [] = [];
  librosDelete:Libro [] = [];
  cantidad = 1;
  precioTotal = 0;
  fechaCompra = new Date();
  userId = 0;
  selectedCantidad = 0;
  selectedLibro!:Libro;
  datosBank!:DatosBank;




  constructor(private userService: UserService, private fb: FormBuilder,private loginAuthService:LoginAuthService,
      private router:Router, private pedidoService:PedidoService) {
    this.carrito = new Carrito(this.userSeleccionado,[],0,0);
  }

  ngOnInit(): void {
    this.getLibros();
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.userSeleccionado = user;
  });

    this.userService.getUser().subscribe((users: User[]) => {
      this.users = users;
      console.log(this.users);

    });

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.datosBankForm = this.fb.group({
      titular: ['', Validators.required],
      numero: ['', Validators.required],
      fecha: ['', Validators.required],
      cvv: ['', Validators.required],
    });

    this.userFormAdd = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      cp: ['', Validators.required],
      direccion: ['', Validators.required],
      DNI: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  showUserDetails(user: any): void {
    this.selectedUser = user;
    this.displayDialog = true;
  }

  closeDialog(): void {
    this.displayDialog = false;
    this.displayLogin = false;

  }

  findUserByNameAndPassword(): void {
    this.contador = 0;
    this.displayLogin = true;
    this.userForm.patchValue({
      name: this.nameUser,
      password: this.passwordUser,
    });

  }
  login(): void {
  const log = this.userForm.value;
    console.log('Datos del usuario antes de enviar:', log);
    this.users.forEach((user: any) => {
      if (log.name === user.nombre && log.password === user.pwd) {
      this.selectedUser = user;
        console.log('User encontrado:', this.users);
        this.isLogin=true;
        this.contador++;
        this.displayLogin = false;
        this.loginAuthService.saveUser(user);
      }
    });
    if (this.contador == 0) {
      console.log('User no encontrado:', this.users);
    }
    console.log('User login:', this.userForm.value);

  }


  modificarUser(user: any): void {
    if (this.userForm.valid) {
      user = this.userForm.value;
      console.log('User modificado:', user);
      this.userService.postUser(user).subscribe({
        next: (response: any) => {
          console.log('User actualizado:', response);
          user = null;
        },
        error: (err: any) => {
          console.error('Error actualizando el user:', err);
        }
      });
    }
  }

  register(): void {
    this.displayAdd = true;
    this.displayLogin = false;
    this.userFormAdd.patchValue({
      nombre: this.userAuxAdd.nombre,
      apellidos: this.userAuxAdd.apellidos,
      cp: this.userAuxAdd.cp,
      direccion: this.userAuxAdd.direccion,
      DNI: this.userAuxAdd.DNI,
      email: this.userAuxAdd.email,
      pwd: this.userAuxAdd.pwd,
      rol: "member",
    });
    console.log('probando:', this.userAuxAdd);
  }

addUser(): void {
  console.log('Datos del usuario antes de enviar:', this.userFormAdd.value);
  const user = this.userFormAdd.value;
  console.log('Datos del usuario antes de enviar:', user);  // Verificar que el DNI está presente
  this.userService.postUser(user).subscribe({
    next: (response: any) => {
      console.log('User actualizado:', response);
      this.users.push(user);
      this.displayAdd = false; // Cierra el formulario
    },
    error: (err: any) => {
      console.error('Error actualizando el user:', err);
    }
  });

  this.displayAdd = false;
}


  deleteUser(user: any): void {
    this.userService.deleteUser(user.id).subscribe({
      next: (response: any) => {
        console.log('User eliminado:', response);
        this.users = this.users.filter((l: any) => l.id !== user.id);
        this.selectedUser = null;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error eliminando el user:', err);
        if (err.status === 500) {
          this.errorMessage = 'No se puede borrar el user porque existen libros asociados. Primero borre los libros.';
          this.displayError = true;
        }
      }
    });
    this.displayDelete = false;
  }

  deleteConfirm(user: any): void {
    this.userSelectedDelete = user;
    this.displayDelete = true;
  }

  crearCarrito(): void {
    this.carrito = new Carrito(this.userSeleccionado,this.libros,this.cantidad,this.precioTotal);
  }

  sumarCantidad(number:number,libro:Libro): void {
      libro.cantidad = libro.cantidad + number;
      this.precioTotal = this.precioTotal + libro.precio;
  }

  restarCantidad(number:number,libro:Libro): void {
    if(libro.cantidad > 0){

      libro.cantidad = libro.cantidad - number;
      this.precioTotal = this.precioTotal - libro.precio;
    }
    else{
      libro.cantidad = 0;
    }
  }

  modificarCantidad(number:number): void {

  }

  calcularPrecioTodal(libros:Libro[]): void {
    for(let i = 0; i < libros.length; i++){
      this.carrito.precioTotal += libros[i].precio;
    }
  }

modificarCarrito(): void {
  this.displayBooks = true;
  this.getLibros();
  this.modificarCantidad(this.selectedCantidad)
  this.calcularPrecioTodal(this.libros);
  this.crearCarrito();
  localStorage.setItem('carrito', JSON.stringify(this.carrito));
}
getLibros(): void {
  this.libros = JSON.parse(localStorage.getItem('libroCarrito') || '[]');
  this.userId = JSON.parse(localStorage.getItem('userId') || '0');
  this.cantidadLibros = this.libros.length;

}

comprar(): void {
  this.displayCompra = true;
  this.displayBooks = false;
this.carrito.user.datosBank = this.datosBank;


}
guardar(){
  this.crearCarrito();
  this.pedidoService.postPedido(this.carrito).subscribe({
    next: (response: any) => {
      console.log('Pedido actualizado:', response);
      this.displayCompra = false;
      this.vaciarCarrito();
    },
    error: (err: any) => {
      console.error('Error actualizando el pedido:', err);
    }

  });
}

insertarDatosBank(): void {
this.displayBooks = false;
}
vaciarCarrito(): void {
  localStorage.setItem('libroCarrito', JSON.stringify(this.librosDelete));
  this.displayBooks = false;
  this.libros = [];
  this.cantidadLibros = 0;
  this.precioTotal = 0;
}
}
