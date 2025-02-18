
export class Autor {
    id: number;
    nombre: string;

    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }

    toString(): string {
        return this.nombre;
    }
}
