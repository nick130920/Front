import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { NavService } from '../../service/nav.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { role } from 'src/app/shared/role';
import { LogicaGuardService } from 'src/app/guard/logica-guard.service';
import { LogicaGuardNavService } from 'src/app/guard/logica-guard-nav.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  admin: boolean;
  sesion: boolean;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private logicaGuard: LogicaGuardService,
    private logicaGuardNav: LogicaGuardNavService,
    private navService:NavService,
  ) { }




  ngOnInit(): void {
    this.initForm();
    this.validar();
  }


  private initForm(): void {
    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
    })
  }

  onLoginClick(): void {

    this.loginService.login(this.form.get('usuario').value, this.form.get('clave').value).subscribe(res => {

      sessionStorage.setItem(environment.tokenName, res.access_token);
      // redireccionar a pagina de inciio
      console.log(res);
      localStorage.setItem('usuario',this.form.get('usuario').value);
      this.router.navigateByUrl('cards');
      this.pagina();
    }, err => {

      console.log(err);

      if (err.status == 500) {

        // error en el servidor
        console.log('error');

      } else {

        // credenciales incorrectas
        console.log('credenciales incorrectas');
      }

    });
  }

  validar():void{
    if(sessionStorage.getItem(environment.tokenName)!=null){
      this.router.navigateByUrl('/cards');
    }
  }

  pagina():void{

    this.navService.navAdmin.emit(this.logicaGuardNav.permisosNav([role.administrador]));
    this.navService.navLogin.emit(this.sesion);

  }

  move(ruta): void {
    this.router.navigateByUrl(ruta);
  }

  /*canActivate(): void {
    this.admin = this.logicaGuard.permisosValidosNav([role.administrador]);
  }*/

}
