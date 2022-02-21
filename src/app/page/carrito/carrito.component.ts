import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/service/carrito.service';
import { Observable } from 'rxjs';
import { Carrito } from 'src/app/model/carrito';
import { ProductoFactura } from 'src/app/model/productoFactura';
import { PersonaService } from 'src/app/service/persona.service';
import { Factura } from 'src/app/model/factura';
import { Persona } from 'src/app/model/persona';
import { FacturaDTO } from 'src/app/model/facturaDTO';
import { Producto } from 'src/app/model/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito$: Observable<Carrito[]>;
  carrito;
  validador;
  productoFactura: ProductoFactura[] = [];
  cupon:string = '';
  leng = [];
  constructor(
    private carritoService: CarritoService,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    if(this.carritoService.getData() != null){
      let comprobador = this.carritoService.getData();
      if(comprobador.length > 0) this.validador = true;
      else this.validador = false;
      this.carritoService.setData(this.carritoService.getData());
    }else{
      this.validador = false;
    }
    this.carrito = this.carritoService.getData();
    this.carrito$ = this.carrito;
  }
  setProducto(dato, reduce:boolean){
    console.log(dato.codigo);
    let carrito: Carrito[] =[];
    let esta:boolean=false;
    let data = this.carritoService.getData();
    if(data){
      carrito = data;
      // console.log(dato.codigo);
      for (let i = 0; i < carrito.length; i++) {
        // console.log(carrito[i].codigo);
        if (carrito[i].codigo==dato.codigo) {
          esta=true;
          // console.log(carrito[i].cantidad);
          if (reduce) {
            carrito[i].cantidad = carrito[i].cantidad-1;
          } else {
            if (carrito[i].cantidad>0) {
              carrito[i].cantidad = carrito[i].cantidad+1;
            } else {
              carrito[i].cantidad = 1;
            }
          }
        }
      }
      if (!esta) {
        dato.cantidad = 1;
        carrito.push(dato);
      }
      // carrito.push(dato);
    }
    console.log(carrito);

    // this.navService.carrito.emit(carrito);
    this.carritoService.setData(carrito);
  }
  reduceCantidad(dato){
    dato.cantidad = dato.cantidad-1;
    console.log(dato);
    this.setProducto(dato, true);
  }
  aumentaCantidad(dato){
    dato.cantidad = dato.cantidad+1;
    this.setProducto(dato, false);
  }
  eliminar(dato){
    let carrito = this.carritoService.getData();
    console.log(carrito);
    let remover;
    for (let i = 0; i < carrito.length; i++) {
      console.log(i);
      if (carrito[i].codigo==dato.codigo) {
        console.log(carrito[i]);
        remover = i;
      }
    }
    carrito.splice(remover, 1);
    this.carritoService.setData(carrito);
    console.log(carrito);
    this.carrito$ = carrito;

  }
  total(){
    let carrito: Carrito[] =[];
    let esta:boolean=false;
    let data = this.carritoService.getData();
    let total = 0;
    let subtotal;
    if(data){
      carrito = data;
      for (let i = 0; i < carrito.length; i++) {
        // console.log(carrito[i].codigo);
        subtotal = carrito[i].cantidad * carrito[i].precio;
        total = total + subtotal;
      }
    }else{
      return 0;
    }
    return total;
  }

  btnEnvio(){
    this.productoFactura = [];
    let factura: Factura = new Factura();
    let persona: Persona = new Persona();
    let facturaDTO: FacturaDTO = new FacturaDTO();
    let carrito = this.carritoService.getData();
    this.personaService.listarPersonaU().subscribe(per => {
      persona.codigo = per.codigo;
    });
    for(let i = 0; i < carrito.length; i++){
      let productoFactura: ProductoFactura = new ProductoFactura();
      let producto: Producto = new Producto();
      producto.codigo = carrito[i].codigo;
      productoFactura.cantidad = carrito[i].cantidad;
      productoFactura.producto = producto;
      this.productoFactura.push(productoFactura);
    }
    factura.persona = persona;
    factura.lstProductoFactura = this.productoFactura;

    facturaDTO.cupon = this.cupon;
    facturaDTO.fatura = factura;
    console.log(facturaDTO);
    this.carritoService.facturar(facturaDTO).subscribe(fac => {
      console.log(fac);
    });
  }

  guardarCupon(cupon:string){
    this.cupon = cupon;
  }
}

