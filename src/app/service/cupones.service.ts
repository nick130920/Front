import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { Cupon } from '../model/cupones';

@Injectable({ providedIn: 'root'})

export class CuponService {
  private url: string = `${environment.apiUrl}/cupon`;

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(`${this.url}/listar`);
  }

  crear(cupon: Cupon): Observable<void> {
    return this.http.post<void>(`${this.url}/insertar`, cupon);
  }

}
