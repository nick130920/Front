import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { EstadoService } from 'src/app/service/estado.service';
import { TipoDocService } from 'src/app/service/tipoDoc.service';
import { Estado } from 'src/app/model/estado';
import { TipoDoc } from 'src/app/model/tipoDoc';


import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  tipo_documento$: Observable<TipoDoc[]>;
  public siteKey: any;
  show:boolean;
  lstEstCodigo: Estado[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  codigo:number;


  constructor(
    private personaService: PersonaService,
    private estadoService: EstadoService,
    private tipoDocService: TipoDocService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    ) {this.show = false;}

  ngOnInit(): void {
    this.listarTiposDocumentos();
    this.initForm();
  }

  private initForm(): void {
    // console.log(this.tipo_documento$);
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      correo: ['', Validators.required],
      documento: [, Validators.required],
      // nacimiento: ['', Validators.required],
      tipo_documento: [0, Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      estado: [0, Validators.required],
      recaptcha2: ['', Validators.required],
      terminos: [false, Validators.required],

    });
    this.siteKey = "6LcSFDkeAAAAAB_lxGhWFBTaUNyZNkKxAIWNHMgC";
  }

  public registrar(){

    let persona: Persona = new Persona();
    let estado: Estado = new Estado();
    persona.nombre = this.firstFormGroup.value['name'];
    persona.apellido = this.firstFormGroup.value['lastName'];
    persona.correo = this.firstFormGroup.value['correo'];
    persona.documento = this.firstFormGroup.value['documento'];
    persona.nacimiento = this.firstFormGroup.value['nacimiento'];
    persona.tipo_documento = this.firstFormGroup.value['tipoDocumento'];
    estado.codigo =   1;
    persona.estado = estado;

    persona.usuario = this.secondFormGroup.value['user'];
    persona.clave = this.secondFormGroup.value['password'];
    console.log(persona);
    this.personaService.crear(persona).subscribe(data => {
      this.spinner.hide();
      this.toastr.success("Creado con éxito");

    }, err => this.mensajeError(err));;
  }

  listarEstado() {
    this.estadoService.buscarTodo().subscribe(data => {
      this.lstEstCodigo = data;
    })
  }
  listarTiposDocumentos() {
    this.tipoDocService.buscarTodo().subscribe(data => {
      this.tipo_documento$ = data;
    });
  }
  password() {
    this.show = !this.show;
  }
  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }
}
