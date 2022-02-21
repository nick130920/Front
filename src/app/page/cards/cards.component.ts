import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from 'src/app/data/constants/carousel.const';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { CarritoService } from 'src/app/service/carrito.service';

import { Observable } from 'rxjs';
import { NavService } from 'src/app/service/nav.service';
import { Carrito } from 'src/app/model/carrito';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  lstCatCodigo: Categoria[];
  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  // Card is whatever type you use for your datasource, DATA is your data
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private navService: NavService
  ) {}

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.categoria.nombre.toLowerCase().includes(filter);
    };
    this.changeDetectorRef.detectChanges();
    this.buscar();
    this.listarCategoria();
  }

  buscar() {
    this.productoService.buscarTodo().subscribe((data) => {
      console.log(data);
      this.dataSource = new MatTableDataSource<Producto>(data);
      this.obs = this.dataSource.connect();
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }
  filtrar_Categoria(parametro: number) {
    if (parametro == 0) {
      this.productoService.buscarTodo().subscribe((data) => {
        this.dataSource = new MatTableDataSource<Producto>(data);
        console.log(this.dataSource);
        this.obs = this.dataSource.connect();
        this.paginator.firstPage();
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.productoService
        .buscarProductosPorCategoria(parametro)
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource<Producto>(data);
          console.log(this.dataSource);
          this.obs = this.dataSource.connect();
          this.paginator.firstPage();
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  listarCategoria() {
    this.categoriaService.buscarTodo().subscribe((data) => {
      this.lstCatCodigo = data;
    });
  }

  setProducto(dato) {
    console.log(dato.codigo);
    let carrito: Carrito[] = [];
    let esta: boolean = false;
    let data = this.carritoService.getData();
    if (data != null) {
      carrito = data;
      for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i].codigo);
        if (carrito[i].codigo == dato.codigo) {
          esta = true;
          console.log(carrito[i].cantidad);
          if (carrito[i].cantidad > 0) {
            if(carrito[i].cantidad < carrito[i].stock)
              carrito[i].cantidad = carrito[i].cantidad + 1;
          } else {
            carrito[i].cantidad = 1;
          }
        }
      }
      if (!esta) {
        dato.cantidad = 1;
        carrito.push(dato);
      }
      // carrito.push(dato);
    }else{
      carrito[0] = dato;
      carrito[0]['cantidad'] = 1;
    }
    console.log(carrito);

    // this.navService.carrito.emit(carrito);
    this.carritoService.setData(carrito);
  }
}
