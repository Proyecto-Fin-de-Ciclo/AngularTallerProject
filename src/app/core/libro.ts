import { Autor } from "./autor";
import { Temas } from "./tema";
import { Edicion } from "./edicion";
import { Formato } from "./formato";

export class Libro {
    id: number;
    nombre: string;
    ISBN: string;
    imgName?: string;
    autor: Autor;
    tema: Temas;
    precio: number;
    edicion: Edicion;
    formato: Formato;
    cantidad: number;

    constructor(
        id: number,
        nombre: string,
        ISBN: string,
        autor: Autor,
        tema: Temas,
        precio: number,
        edicion: Edicion,
        formato: Formato,
        cantidad: number,
        imgName?: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.ISBN = ISBN;
        this.autor = autor;
        this.tema = tema;
        this.precio = precio;
        this.edicion = edicion;
        this.formato = formato;
        this.cantidad = cantidad;
        this.imgName = imgName;
    }
}
