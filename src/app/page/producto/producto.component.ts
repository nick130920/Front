import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadoService } from 'src/app/service/estado.service';
import { Estado } from 'src/app/model/estado';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria } from 'src/app/model/categoria';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  urlImagen: String = `${environment.apiUrl}/producto/imagen`;
  file: FileList;
  form: FormGroup;
  editar: boolean = false;
  lstEstCodigo: Estado[];
  mensajeSatisfactorio: string = 'Satisfactorio';
  lstCatCodigo: Categoria[];

  estudiante: number;

  displayedColumns: string[] = ['codigo', 'producto', 'descripcion', 'imagen', 'precio', 'referencia', 'categoria', 'stock', 'estado', 'editar'];

  dataSource = new MatTableDataSource<Producto>([]);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private estudianteService: ProductoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private estadoService: EstadoService,
    private categoriaService: CategoriaService
  ) {

  }


  ngOnInit(): void {
    this.initForm();
    this.buscar();
    this.listarEstado();
    this.listarCategoria();

  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      referencia: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      codigo: new FormControl('')
    });
  }

  clickEnviar() {

    let producto: Producto = new Producto();
    let estado: Estado = new Estado();
    let categoria: Categoria = new Categoria();
    this.spinner.show();

    producto.codigo = this.form.get('codigo').value;
    producto.nombre = this.form.get('nombre').value;
    producto.descripcion = this.form.get('descripcion').value;
    producto.stock = this.form.get('stock').value;

    let imagen: File;

    if (this.file != null) {
      console.log("no esta nulo")
      imagen = this.file.item(0);
    }
    producto.precio = this.form.get('precio').value;
    producto.referencia = this.form.get('referencia').value;

    categoria.codigo = this.form.get('categoria').value;
    producto.categoria = categoria;

    estado.codigo = this.form.get('estado').value;
    producto.estado = estado;

    console.log(producto);

    if (!this.editar) {

      if (imagen != null) {
        console.log(imagen);
        console.log("se supone que llego la imagen");
        this.registrar(imagen, producto);
      } else {
        console.log("se supone que no llego la imagen");
        this.actualizarSinImagen(producto);
      }


    } else {

      this.actualizar(imagen, producto);

    }

  }

  onCancelar() {

    this.form.reset();
    this.editar = false;

  }

  onEliminar() {

    let producto: Producto = new Producto();
    let estado: Estado = new Estado();
    let categoria: Categoria = new Categoria();
    this.spinner.show();

    producto.codigo = this.form.get('codigo').value;
    producto.nombre = this.form.get('nombre').value;
    producto.descripcion = this.form.get('descripcion').value;

    producto.precio = this.form.get('precio').value;
    producto.referencia = this.form.get('referencia').value;

    categoria.codigo = this.form.get('categoria').value;
    producto.categoria = categoria;

    estado.codigo = this.form.get('estado').value;
    producto.estado = estado;

    this.spinner.show();
    this.estudianteService.eliminar(producto).subscribe(data => {
      this.spinner.hide();

      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();
      this.editar = false;
      this.buscar();
    }, err => this.mensajeError(err));

  }

  registrar(imagen: File, producto: Producto): void {

    this.estudianteService.crear(imagen, producto).subscribe(data => {

      this.spinner.hide();
      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();

      this.buscar();

    }, err => this.mensajeError(err));
  }

  actualizar(imagen: File, producto: Producto): void {

    this.estudianteService.editar(imagen, producto).subscribe(data => {
      this.spinner.hide();

      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();

      this.buscar();

    }, err => this.mensajeError(err));

  }


  actualizarSinImagen(producto: Producto): void {

    this.estudianteService.editarSinImagen(producto).subscribe(data => {

      this.spinner.hide();

      this.toastr.success(this.mensajeSatisfactorio);
      this.form.reset();

      this.buscar();

    }, err => this.mensajeError(err));

  }

  buscar() {
    this.estudianteService.buscarAdmin().subscribe(data => {
      this.dataSource = new MatTableDataSource<Producto>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      console.log(data);
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }

  onEditarClick(element: Producto) {
    this.editar = true;
    this.form.get('codigo').setValue(element.codigo);
    this.form.get('estado').setValue(element.estado.codigo);
    this.form.get('nombre').setValue(element.nombre);
    this.form.get('descripcion').setValue(element.descripcion);
    this.form.get('precio').setValue(element.precio);
    this.form.get('referencia').setValue(element.referencia);
    this.form.get('categoria').setValue(element.categoria.codigo);
    this.form.get('imagen').setValue(element.imagen);
    this.estudiante = element.codigo;

  }

  listarCategoria() {
    this.categoriaService.buscarTodo().subscribe(data => {
      this.lstCatCodigo = data;
    })
  }

  listarEstado() {
    this.estadoService.buscarTodo().subscribe(data => {
      this.lstEstCodigo = data;
    })
  }

  change(file: FileList): void {
    this.file = file
    this.toastr.success("Archivo Subido");
  }
}
