import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private url: string = `${environment.apiUrl}/persona`;
  private urlUsuario: string = `${environment.apiUrl}/usuario`;

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.url}/listar`);
  }
  buscarDocumento(documento:number): Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.url}`);

  }

  crear(persona: Persona): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, persona);
  }

  editar(persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar-para-usuario`, persona)
  }

  editarAdmin(persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar-admin`, persona)
  }

  eliminar(persona: Persona): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, persona);
  }
  listarPersona(usuario): Observable<Usuario[]>{
    console.log(`${this.url}/buscar/${usuario}`);
    return this.http.get<Usuario[]>(`${this.urlUsuario}/buscar/${usuario}`);
  }

  listarPersonaU(): Observable<Persona>{
    return this.http.get<Persona>(`${this.url}/listar-persona`);
  }

}
