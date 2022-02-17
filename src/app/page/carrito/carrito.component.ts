import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/service/carrito.service';
import { Observable } from 'rxjs';
import { Carrito } from 'src/app/model/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito$: Observable<Carrito[]>;
  carrito;
  leng = [];
  constructor(
    private carritoService: CarritoService,
  ) { }

  ngOnInit(): void {
    this.carritoService.getData$().subscribe(data => {
      this.leng.push(data);
      console.log(this.leng);
    });
    if(this.carritoService.getData() != null){
      this.carritoService.setData(this.carritoService.getData());
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
}
