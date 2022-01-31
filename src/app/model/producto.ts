import { Estado } from './estado';
import { Categoria } from './categoria';

export class Producto {
    codigo: number;
    nombre: string;
    descripcion: string;
    imagen:string;
    precio: number;
    referencia: string;
    estado: Estado;
    stock: number;
    categoria: Categoria;
}
