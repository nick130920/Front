import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url: string = `${environment.apiUrl}/categoria`;

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/listar`);
  }

  crear(categoria: Categoria): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, categoria);
  }

  editar(categoria: Categoria): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, categoria)
  }

  eliminar(categoria: Categoria): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, categoria);
  }

  buscarAdmin(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.url}/listar-admin`);
  }
}
