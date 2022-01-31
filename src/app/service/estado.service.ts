import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private url: string = `${environment.apiUrl}/estado`;

  constructor(
    private http:HttpClient
  ) { }

  buscarTodo(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.url}/listar`);
  }
}
