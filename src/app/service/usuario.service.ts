import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) { }

  buscarTodo(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/listar`);
  }
  buscarId(id:number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.url}/listaProductoPorCodigo/${id}`);
  }

  crear(usuario: Usuario): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, usuario);
  }

  editar(usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, usuario)
  }

  eliminar(usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, usuario);
  }

}
