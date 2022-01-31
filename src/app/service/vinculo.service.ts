import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vinculo } from '../model/vinculo';

@Injectable({
  providedIn: 'root'
})
export class VinculoService {

  private url: string = `${environment.apiUrl}/vinculo`;

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Vinculo[]> {
    return this.http.get<Vinculo[]>(`${this.url}/listar`);
  }

  crear(vinculo: Vinculo): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, vinculo);
  }

  editar(vinculo: Vinculo): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, vinculo)
  }

  eliminar(vinculo: Vinculo): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, vinculo);
  }


}
