import { Estado } from "./estado";
import { Persona } from "./persona";
import { Role } from "./role";


export class Usuario{
    id:number;
    persona: Persona;
    usuario:string;
    clave:string;
    estado:Estado;
}
