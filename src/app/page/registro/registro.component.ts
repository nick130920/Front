import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/service/persona.service';
import { EstadoService } from 'src/app/service/estado.service';
import { TipoDocService } from 'src/app/service/tipoDoc.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { UsuarioRolService } from 'src/app/service/usuarioRol.service';
import { Estado } from 'src/app/model/estado';
import { TipoDoc } from 'src/app/model/tipoDoc';
import { Usuario } from 'src/app/model/usuario';


import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UsuarioRol } from 'src/app/model/usuarioRol';
import { Role } from 'src/app/model/role';

@Component({
  selector: 'app-productos',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  tipo_documento: TipoDoc[];
  public siteKey: any;
  show:boolean;
  lstEstCodigo: Estado[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  checked = false;
  datosRespuesta;


  constructor(
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private usuarioRolService: UsuarioRolService,
    private estadoService: EstadoService,
    private tipoDocService: TipoDocService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    ) {this.show = false;}

  ngOnInit(): void {
    this.initForm();
    this.listarTiposDocumentos();
  }
  listarTiposDocumentos() {
    this.tipoDocService.buscarTodo().subscribe(data => {
      this.tipo_documento = data;
      console.log(this.tipo_documento);
    });
  }
  initForm() {
    // console.log(this.tipo_documento$);
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      correo: ['', Validators.required],
      documento: [, Validators.required],
      nacimiento: ['', Validators.required],
      tipo: [0, Validators.required],
      terminos: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      estado: [0, Validators.required],
      recaptcha2: ['', Validators.required],

    });
    this.siteKey = "6LcSFDkeAAAAAB_lxGhWFBTaUNyZNkKxAIWNHMgC";
  }

  public registrar(){

    let persona: Persona = new Persona();
    let estado: Estado = new Estado();
    let tipoDocumento: TipoDoc= new TipoDoc();
    let usuario: Usuario = new Usuario();
    let role: Role = new Role();
    let usuarioRol: UsuarioRol = new UsuarioRol();

    persona.nombre = this.firstFormGroup.value['name'];
    persona.apellido = this.firstFormGroup.value['lastName'];
    persona.correo = this.firstFormGroup.value['correo'];
    persona.documento = this.firstFormGroup.value['documento'];
    persona.nacimiento = this.firstFormGroup.value['nacimiento'];
    tipoDocumento.codigo = this.firstFormGroup.value['tipo'];
    persona.tipoDocumento = tipoDocumento;
    estado.codigo =   1;
    persona.estado = estado;
    usuario.usuario = this.secondFormGroup.value['user'];
    usuario.clave = this.secondFormGroup.value['password'];
    usuario.estado = estado;

    role.codigo= 2;
    usuarioRol.estado = estado;
    usuarioRol.rol = role;

    this.usuarioRolService.crear(usuarioRol).subscribe(data =>{
      console.log(data);
    }, err => this.mensajeError(err));

    // persona.usuario = usuario;
    console.log(persona);
    this.personaService.crear(persona).subscribe(data => {
      this.spinner.hide();
      this.toastr.success("Persona creada con éxito");
      this.datosRespuesta = data;
      persona.codigo = this.datosRespuesta.codigoRespuesta.codigo;
      usuario.persona = persona;
      console.log(usuario);
      this.RegistarUsuario(usuario);
    }, err => this.mensajeError(err));
  }
  RegistarUsuario(usuario: Usuario){
    console.log(usuario);
    this.usuarioService.crear(usuario).subscribe(data=>{
      this.spinner.hide();
      this.toastr.success("Usuario creado con éxito");
      console.log(data);
    }, err => this.mensajeError(err));

  }

  listarEstado() {
    this.estadoService.buscarTodo().subscribe(data => {
      this.lstEstCodigo = data;
    })
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
