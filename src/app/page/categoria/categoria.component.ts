import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { EstadoService } from '../../service/estado.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/model/categoria';
import { Estado } from 'src/app/model/estado';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  form: FormGroup;
  editar: boolean = false;
  lstEstCodigo: Estado[];
  variable2: number;
  variable: number;
  lstPerCodigoTabla: number;
  lstProCodigoTabla: number;
  mensajeSatisfactorio: string = 'Satisfactorio';

  estudiante:number;

  displayedColumns: string[] = ['codigo', 'categoria', 'estado','editar'];

  dataSource = new MatTableDataSource<Categoria>([]);


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private estadoService: EstadoService,
  ) {

  }


  ngOnInit(): void {
    this.initForm();
    this.buscar();
    this.listarEstado();

  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      codigo: new FormControl('')
    })
  }

  clickEnviar() {

    let categoria: Categoria = new Categoria();
    let estado: Estado = new Estado();
    this.spinner.show();

    categoria.codigo = this.form.get('codigo').value;
    categoria.nombre = this.form.get('nombre').value;

    estado.codigo = this.form.get('estado').value;
    categoria.estado = estado;

    console.log(categoria);

    if (!this.editar) {

      this.registrar(categoria);

    } else {

      this.actualizar(categoria);

    }

  }

  onCancelar() {

    this.form.reset();
    this.editar = false;

  }

  onEliminar() {

    let categoria: Categoria = new Categoria();
    let estado: Estado = new Estado();
    this.spinner.show();
    categoria.codigo = this.form.get('codigo').value;
    categoria.nombre = this.form.get('nombre').value;

    estado.codigo = this.form.get('estado').value;
    categoria.estado = estado;

    this.spinner.show();
    this.categoriaService.eliminar(categoria).subscribe(data => {
      this.spinner.hide();

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();
        this.editar = false;
        this.buscar();
    }, err => this.mensajeError(err));

  }

  registrar(categoria: Categoria): void {

    this.categoriaService.crear(categoria).subscribe(data => {

      this.spinner.hide();

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));
  }

  actualizar(categoria: Categoria): void {

    this.categoriaService.editar(categoria).subscribe(data => {
      this.spinner.hide();

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));

  }

  buscar() {
    this.categoriaService.buscarTodo().subscribe(data => {
      this.dataSource = new MatTableDataSource<Categoria>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }

  listarEstado() {
    this.estadoService.buscarTodo().subscribe(data => {
      this.lstEstCodigo = data;
    })
  }
  onEditarClick(element: Categoria) {
    this.editar = true;
    this.form.get('codigo').setValue(element.codigo);
    this.form.get('estado').setValue(element.estado.codigo);
    this.form.get('nombre').setValue(element.nombre);
    this.estudiante=element.codigo;

  }

}
