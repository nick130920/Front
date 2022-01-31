import {Estado}from './estado';
import{Vinculo}from './vinculo';
import{TipoDoc}from './tipoDoc';

export class Persona{
    codigo:number;
    nombre:string;
    apellido:string;
    correo:string;
    clave:string;
    persona:number;
    documento:string;
    tipo_documento:TipoDoc;
    estado:Estado;
    nacimiento:Date;
    usuario:string;
    vinculo:Vinculo;
}
