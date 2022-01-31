import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from 'src/app/data/constants/carousel.const';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
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
    private categoriaService: CategoriaService
    ) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.categoria.nombre.toLowerCase().includes(filter);
    };
    this.changeDetectorRef.detectChanges();
    this.buscar();
    this.listarCategoria();
  }

  buscar() {
    this.productoService.buscarTodo().subscribe(data => {
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
  filtrar_Categoria(parametro:number) {
    this.productoService.buscarProductosPorCategoria(parametro).subscribe(data =>{
      this.dataSource = new MatTableDataSource<Producto>(data);
      console.log(this.dataSource);
      this.obs = this.dataSource.connect();
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  listarCategoria() {
    this.categoriaService.buscarTodo().subscribe(data => {
      this.lstCatCodigo = data;
    })
  }

}
