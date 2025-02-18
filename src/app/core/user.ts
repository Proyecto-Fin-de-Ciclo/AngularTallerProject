export class User {
    id: number;
    nombre: string;
    apellidos: string;
    cp: string;
    direccion: string;
    DNI: string;
    email: string;
    pwd: string;

    constructor(id: number, nombre: string, apellidos:string, cp: string, direccion: string, DNI: string, email: string, pwd: string) {
      this.id = id;
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.cp = cp;
      this.direccion = direccion;
      this.DNI = DNI;
      this.email = email;
      this.pwd = pwd;
  }
}
