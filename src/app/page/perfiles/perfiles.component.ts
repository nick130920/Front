import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonaService } from '../../service/persona.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/model/persona';
import { Estado } from 'src/app/model/estado';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  form: FormGroup;
  editar: boolean = false;
  mensajeSatisfactorio: string = 'Satisfactorio';

  estudiante:number;

  displayedColumns: string[] = ['codigo', 'nombre', 'apellido', 'nacimiento', 'correo','editar'];

  dataSource = new MatTableDataSource<Persona>([]);


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {

  }


  ngOnInit(): void {
    this.initForm();
    this.buscar();

  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      codigo: new FormControl('')
    })
  }

  clickEnviar() {

    let persona: Persona = new Persona();
    let estado: Estado = new Estado();
    this.spinner.show();
    persona.nombre = this.form.get('nombre').value;
    persona.apellido = this.form.get('apellido').value;
    persona.correo = this.form.get('correo').value;
    persona.nacimiento = this.form.get('nacimiento').value;
    persona.codigo = this.form.get('codigo').value;
    estado.codigo = 2;
    persona.estado = estado;
    this.actualizar(persona);

  }

  onCancelar() {

    this.form.reset();
    this.editar = false;

  }

  onEliminar() {

    let persona: Persona = new Persona();
    this.spinner.show();

    this.spinner.show();
    this.personaService.eliminar(persona).subscribe(data => {
      this.spinner.hide();

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();
        this.editar = false;
        this.buscar();
    }, err => this.mensajeError(err));

  }


  actualizar(persona: Persona): void {

    this.personaService.editarAdmin(persona).subscribe(data => {
      this.spinner.hide();

        this.toastr.success(this.mensajeSatisfactorio);
        this.form.reset();

        this.buscar();

    }, err => this.mensajeError(err));

  }

  buscar() {
    this.personaService.buscarTodo().subscribe(data => {
      this.dataSource = new MatTableDataSource<Persona>(data);
      console.log(data)
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
    });
  }

  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }

  onEditarClick(element: Persona) {
    console.log(element)
    this.editar = true;
    this.form.get('codigo').setValue(element.codigo);
    this.form.get('apellido').setValue(element.apellido);
    this.form.get('nombre').setValue(element.nombre);
    this.form.get('nacimiento').setValue(element.nacimiento);
    this.form.get('correo').setValue(element.correo);
    this.estudiante=element.codigo;

  }

}
