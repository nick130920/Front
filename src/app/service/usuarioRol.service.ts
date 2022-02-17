import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioRol } from '../model/usuarioRol';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  private url: string = `${environment.apiUrl}/usuario-role`;

  constructor(private http: HttpClient) { }

  buscarTodo(): Observable<UsuarioRol[]> {
    return this.http.get<UsuarioRol[]>(`${this.url}/listar`);
  }
  buscarId(id:number): Observable<UsuarioRol[]> {
    return this.http.get<UsuarioRol[]>(`${this.url}/listaProductoPorCodigo/${id}`);
  }

  crear(usuarioRol: UsuarioRol): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, usuarioRol);
  }

  editar(usuarioRol: UsuarioRol): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, usuarioRol)
  }

  eliminar(usuarioRol: UsuarioRol): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, usuarioRol);
  }

}
