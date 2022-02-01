import {Estado}from './estado';
import{Vinculo}from './vinculo';
import{TipoDoc}from './tipoDoc';
import{Usuario}from './usuario';

export class Persona{
    codigo:number;
    nombre:string;
    apellido:string;
    correo:string;
    persona:number;
    documento:string;
    tipoDocumento:TipoDoc;
    estado:Estado;
    nacimiento:Date;
}
