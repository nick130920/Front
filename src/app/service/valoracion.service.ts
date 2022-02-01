import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Valoracion } from '../model/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  private url: string = `${environment.apiUrl}/valoracion`;

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(codigo:number): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(`${this.url}/todo/${codigo}`);
  }

  crear(valoracion: Valoracion): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, valoracion);
  }

  editar(valoracion: Valoracion): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, valoracion)
  }

  eliminar(valoracion: Valoracion): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, valoracion);
  }


}
