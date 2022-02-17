import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LogicaGuardNavService } from './guard/logica-guard-nav.service';
import { Producto } from './model/producto';
import { CarritoService } from './service/carrito.service';
import { NavService } from './service/nav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnChanges  {
  @Input() productosCarrito: Observable<any>;
  productos: Producto[];
  carrito;
  title = 'ecommerce';
  badge = 2;
  anio: number;
  fecha = new Date();
  sesion: boolean = false;;
  admin: boolean = false;
  closeS() {
    this.toastr.success('Sesion Cerrada');
    this.sesion = !this.sesion;
    this.admin = false;
    this.router.navigateByUrl('cards');
    sessionStorage.clear();
    localStorage.clear();
  }
  constructor(

    private carritoService: CarritoService,
    private router: Router,
    private navService: NavService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private logicaGuardNav: LogicaGuardNavService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.carrito = this.carritoService.getData();
    console.log(this.carrito);
    this.navService.productos.subscribe((data: Producto[]) => {
     this.productos = data;
    });
  }

  ngOnInit() {
    this.changeDetectorRef.detectChanges();

    this.anio = this.fecha.getUTCFullYear();
  }
}
