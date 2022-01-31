import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url: string = `${environment.apiUrl}/persona`;

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.url}/listar`);
  }

  crear(persona: Persona): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, persona);
  }

  editar(persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, persona)
  }

  eliminar(persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, persona);
  }

}