import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/model/producto';
import { Usuario } from 'src/app/model/usuario';
import { Valoracion } from 'src/app/model/valoracion';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ValoracionService } from 'src/app/service/valoracion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  valorestrellas;
  promedio = 0;
  valoracionesFormGroup: FormGroup;
  mensajeSatisfactorio: string = 'Satisfactorio';
  valoraciones;
  producto;
  id;

  constructor(
    private valoracionService: ValoracionService,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private _formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.buscarProducto(this.id);
  }
  initForm() {
    this.valoracionesFormGroup = this._formBuilder.group({
      // nombre: ['', Validators.required],
      valorestrellas: ['', Validators.required],
      comentario: ['', Validators.required]
    });
  }


  buscarProducto(id: number): void {
    this.productoService.buscarId(id).subscribe(data => {
      this.producto = data;
      console.log(this.producto);
      this.buscarCalificacion(this.producto.codigo);
    });
  }
  buscarCalificacion(id: number) {
    this.valoracionService.buscarTodo(id).subscribe(data => {
      this.valoraciones = data;
      console.log(this.valoraciones);
      let total = 0;
      for (let index = 0; index < data.length; index++) {
        total = total + data[index].estrellas;
        console.log(total);
      }
      this.promedio = total / data.length;
      console.log(this.promedio);
    });
  }
  guardarComentario() {
    this.spinner.show();
    let comentario: Valoracion = new Valoracion();
    let producto: Producto = new Producto();
    let usuario: Usuario = new Usuario();
    comentario.comentario = this.valoracionesFormGroup.get('comentario').value;
    comentario.estrellas = this.valoracionesFormGroup.get('valorestrellas').value;

    producto.codigo = this.producto.codigo;
    comentario.Producto = producto;

    usuario.id = 0;
    comentario.Usuario = usuario;
    console.log(JSON.stringify(comentario));
    this.valoracionService.crear(comentario).subscribe(data => {
      this.valoracionesFormGroup.reset();
      this.spinner.hide();
      this.toastr.success(this.mensajeSatisfactorio);
    }, err => this.mensajeError(err));
  }
  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }

}
