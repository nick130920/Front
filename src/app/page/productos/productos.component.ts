import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { ProductoService } from 'src/app/service/producto.service';
import { ValoracionService } from 'src/app/service/valoracion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  ctrlEstrellas;
  valoracionesFormGroup: FormGroup;

  valoraciones;
  producto;
  id;

  constructor(
    private valoracionService: ValoracionService,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private _formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.initForm();
      this.buscarProducto(this.id);
    }
    initForm(){
      this.valoracionesFormGroup = this._formBuilder.group({
        nombre: ['', Validators.required],
        comentario: ['', Validators.required]
      });
    }


    buscarProducto(id:number): void {
      this.productoService.buscarId(id).subscribe(data => {
        this.producto = data;
        console.log(this.producto);
        this.buscarCalificacion(this.producto.codigo);
      });
    }
    buscarCalificacion(id:number){
      this.valoracionService.buscarTodo(id).subscribe(data => {
        this.valoraciones = data;
        console.log(this.valoraciones);
      });
    }
    guardarEstrellas() {
      if (this.ctrlEstrellas.disabled) {
        this.ctrlEstrellas.enable();
      } else {
        this.ctrlEstrellas.disable();
      }
    }

}
