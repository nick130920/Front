import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { role } from '../shared/role';

@Injectable({
  providedIn: 'root'
})
export class LogicaGuardNavService {

  constructor(
    private _router: Router,
  ) { }


  permisosNav(role: string[]): boolean {

    let token: string = sessionStorage.getItem(environment.tokenName);

    if (token) {

      return this.validarToken(token, role);
    }
  }

  private validarToken(token: string, role: string[]): boolean {

    if (this.isTokenExpired(token)) {
      return this.enviarAlLogin();
    }

    return this.analizarRoles(role);
  }


  private isTokenExpired(token: string): boolean {

    let jwtHelper = new JwtHelperService();

    let fechaExpiracion: Date = jwtHelper.getTokenExpirationDate(token);
    let fechaActual: Date = new Date();

    if (fechaActual.getTime() <= fechaExpiracion.getTime()) {
      return false;
    }
  }

  private enviarAlLogin(): boolean {
    sessionStorage.clear();
    localStorage.clear();
    this._router.navigate(['/login']);
    return false;
  }

  private analizarRoles(rolePermitidos: string[]) {

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.tokenName));

    let lstRole: string[] = decodedToken.authorities;

    for(let i = 0; i < lstRole.length; i++) {

      let tokenRole: string = lstRole[i];

      for(let j = 0; j < rolePermitidos.length; j++) {

        let authRole: string = rolePermitidos[j];

        if(tokenRole == authRole || authRole == role.authenticated) {
          localStorage.setItem('role',tokenRole);
          return true;
        }
      }
    }

    this._router.navigate(['/home']);
    return false;
  }
}
