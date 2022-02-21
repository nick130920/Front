import { Factura } from "./factura";
import { Producto } from "./producto";

export class ProductoFactura{
  codigo:number;
  producto:Producto;
  cantidad:number;
  subtotal:number;
  factura: Factura;
}
