import { Libro } from "./libro";
import { User } from "./user";

export class Carrito {
  user:User;
  libros:Libro [] = [];
  cantidad: number;
  fechaCompra: Date;
  precioTotal: number;

  constructor(user:User, libros:Libro [] = [], cantidad: number,precioTotal: number){ {
      this.user = user;
      this.libros = libros;
      this.cantidad = cantidad;
      this.fechaCompra = new Date();
      this.precioTotal = precioTotal;

  }
}
}
