import { resolve } from 'node:path';
import { DatosBank } from './datosBank';
export class User {
  id: number;
  nombre: string;
  apellidos: string;
  cp: string;
  direccion: string;
  DNI: string;  // Asegúrate de que está en mayúsculas
  email: string;
  pwd: string;
  rol: string;
  datosBank:DatosBank;

  constructor(id: number, nombre: string, apellidos:string, cp: string, direccion: string, DNI: string, email: string, pwd: string,
    rol: string,datosBank:DatosBank) {

    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.cp = cp;
    this.direccion = direccion;
    this.DNI = DNI;
    this.email = email;
    this.pwd = pwd;
    this.rol = rol;
    this.datosBank = datosBank;
}
setDatosBank(datosBank:DatosBank){
  this.datosBank = datosBank;
}
}
