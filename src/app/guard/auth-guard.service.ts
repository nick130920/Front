import { Injectable } from '@angular/core';
import { LogicaGuardService } from './logica-guard.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { role } from '../shared/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private logicaGuard:LogicaGuardService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if(localStorage.getItem('usuario') == null ){
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
