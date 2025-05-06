import { Component } from '@angular/core';
import { Carrito } from '../core/carrito';
import { Libro } from '../core/libro';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrl: './cesta.component.css'
})
export class CestaComponent {
  carrito!:Carrito;
  libros:Libro [] = [];
  cantidad = 0;
  precioTotal = 0;
  fechaCompra = new Date();
  userId = 0;
  selectedCantidad = 0;
  selectedLibro!:Libro;
  cantidadLibros = 0;
  ngOnInit(): void {
    this.getCarrito();

  }
  constructor() {

  }
  guardarLibro(libro:Libro): void {
    this.carrito.libros.push(libro);
    localStorage.setItem('libroCarrito', JSON.stringify(this.libros));


  }
  crearCarrito(): void {

  }

  modificarCantidad(number:number): void {
    this.carrito.cantidad = number;
  }

  calcularPrecioTodal(libros:Libro[]): void {
    for(let i = 0; i < libros.length; i++){
      this.carrito.precioTotal += libros[i].precio;
    }
  }

modificarCarrito(): void {
  this.guardarLibro(this.selectedLibro);
  this.crearCarrito();
  this.modificarCantidad(this.selectedCantidad)
  this.calcularPrecioTodal(this.libros);
  localStorage.setItem('carrito', JSON.stringify(this.carrito));
}
getCarrito(): void {
  this.libros = JSON.parse(localStorage.getItem('libroCarrito') || '[]');
  this.userId = JSON.parse(localStorage.getItem('userId') || '0');
  this.cantidadLibros = this.libros.length;

}
}
