import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


import { Cupon } from 'src/app/model/cupones';
import { CuponService } from 'src/app/service/cupones.service';


@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.component.html',
  styleUrls: ['./cupones.component.css']
})
export class CuponesComponent implements OnInit {
  form: FormGroup;
  editar: boolean = false;
  variable2: number;
  variable: number;
  lstPerCodigoTabla: number;
  lstProCodigoTabla: number;
  mensajeSatisfactorio: string = 'Satisfactorio';

  estudiante:number;

  displayedColumns: string[] = ['codigo','nombre', 'porcentaje', 'serial', 'valor', 'mayor','fecha_inicio', 'fecha_fin'];

  dataSource = new MatTableDataSource<Cupon>([]);


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cuponService: CuponService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha_fin: new FormControl('', Validators.required),
      fecha_inicio: new FormControl('', Validators.required),
      mayor: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      porcentaje: new FormControl(''),
      valor: new FormControl('', Validators.required),
    })
    this.buscar();
  }

  buscar() {
    this.cuponService.buscarTodo().subscribe(data => {
      this.dataSource = new MatTableDataSource<Cupon>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  clickEnviar(){
    this.spinner.show();
    let cupon: Cupon = new Cupon();
    cupon.fechaFin = this.form.get('fecha_fin').value;
    cupon.fechaInicio = this.form.get('fecha_inicio').value;
    cupon.mayor = this.form.get('mayor').value;
    cupon.nombre = this.form.get('nombre').value;
    cupon.porcentaje = this.form.get('porcentaje').value;
    cupon.valor = this.form.get('valor').value;
    this.registrar(cupon);
  }
  registrar(cupon: Cupon): void {

    this.cuponService.crear(cupon).subscribe(data => {

      this.spinner.hide();

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));
  }

  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }
}
