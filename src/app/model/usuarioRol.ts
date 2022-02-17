
import { Estado } from "./estado";
import { Role } from "./role";
import { Usuario } from "./usuario";


export class UsuarioRol{
    id:number;
    usuario: Usuario;
    rol:Role;
    estado:Estado;
}
