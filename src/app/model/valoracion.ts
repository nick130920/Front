import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Valoracion{
    codigo:number;
    comentario:string;
    estrellas:number;
    producto:Producto;
    usuario:Usuario;

}
