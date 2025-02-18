
export class Autor {
    id: number;
    nombre: string;
    imgName: string;
    descripcion: string;

    constructor(id: number, nombre: string,imgName:string, descripcion: string) {
        this.id = id;
        this.nombre = nombre;
        this.imgName = imgName;
        this.descripcion = descripcion;
    }

}
