import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogicaGuardNavService } from './guard/logica-guard-nav.service';
import { NavService } from './service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
    private router: Router,
    private navService: NavService,
    private toastr: ToastrService,
    private logicaGuardNav: LogicaGuardNavService) { }

  ngOnInit() {
    this.anio = this.fecha.getUTCFullYear();
  }
}
