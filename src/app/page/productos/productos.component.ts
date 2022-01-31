import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  producto;
  id;
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    ) {}

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.buscarProducto(this.id);
    }
    buscarProducto(id:number): void {
      this.productoService.buscarId(id).subscribe(data => {
        this.producto = data;
        console.log(this.producto);
      });
    }

}

