import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { PersonaService } from 'src/app/service/persona.service';
import { UsuarioService } from 'src/app/service/usuario.service';

// import { Usuario } from 'src/app/model/usuario';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Persona } from 'src/app/model/persona';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formulario: FormGroup;
  editar: boolean = false;
  usuario;

  usuarios: any;


  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario');
    this.initForm();
    this.buscarPersona(this.usuario);
  }
  private initForm(): void {
    this.formulario = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
      codigo: new FormControl(),
    });
    // rud de persona - Perfil - arreglar el login
  }
  buscarPersona(usuario){
    this.personaService.listarPersona(usuario).subscribe(res => {
      this.onEditarClick(res['persona']);
    }, err => this.mensajeError(err));
    // console.log(persona);
  }
  clickEnviar() {

    let persona: Persona = new Persona();
    this.spinner.show();

    persona.nombre = this.formulario.get('nombre').value;
    persona.apellido = this.formulario.get('apellido').value;
    persona.correo = this.formulario.get('correo').value;
    persona.documento = this.formulario.get('documento').value;
    persona.nacimiento = this.formulario.get('nacimiento').value;
    persona.codigo = this.formulario.get('codigo').value;
    this.personaService.editar(persona).subscribe(res => {
      console.log('Exit')
    }, err => console.log(err)
    )
    console.log(persona);
  }

  onEditarClick(element) {
    this.editar = true;
    this.formulario.get('nombre').setValue(element.nombre);
    this.formulario.get('apellido').setValue(element.apellido);
    this.formulario.get('correo').setValue(element.correo);
    this.formulario.get('documento').setValue(element.documento);
    this.formulario.get('nacimiento').setValue(element.nacimiento);
    this.formulario.get('codigo').setValue(element.codigo);
    console.log(element)
  }
  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }
}
