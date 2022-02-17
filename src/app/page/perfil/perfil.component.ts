import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,  Validators } from '@angular/forms';
import { PersonaService } from 'src/app/service/persona.service';

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

  form: FormGroup;
  editar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.buscarPersona();
  }
  private initForm(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
    });
  }
  buscarPersona(){
    this.personaService.listarPersona().subscribe(res => {
      console.log(res)
      this.onEditarClick(res);
    }, err => this.mensajeError(err));
    // console.log(persona);
  }
  clickEnviar() {

    let persona: Persona = new Persona();
    this.spinner.show();

    persona.nombre = this.form.get('nombre').value;
    persona.apellido = this.form.get('apellido').value;
    persona.correo = this.form.get('correo').value;
    persona.documento = this.form.get('documento').value;
    persona.nacimiento = this.form.get('nacimiento').value
    console.log(persona);
  }

  onEditarClick(element) {
    this.editar = true;
    this.form.get('nombre').setValue(element.nombre);
    this.form.get('apellido').setValue(element.apellido);
    this.form.get('correo').setValue(element.correo);
    this.form.get('documento').setValue(element.documento);
    this.form.get('nacimiento').setValue(element.nacimiento);
  }
  private mensajeError(err: any) {
    this.spinner.hide();
    console.log(err);
    this.toastr.error('Ha ocurrido un problema ');
  }
}
