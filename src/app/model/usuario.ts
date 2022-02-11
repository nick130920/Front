import { Estado } from "./estado";
import { Persona } from "./persona";


export class Usuario{
    id:number;
    persona: Persona;
    usuario:string;
    clave:string;
    estado:Estado;
}
