import { Persona } from "./persona";
import { ProductoFactura } from "./productoFactura";

export class Factura{
  codigo:number;
  persona:Persona;
  total:number;
  creacion:Date;
  lstProductoFactura:ProductoFactura[];
}
