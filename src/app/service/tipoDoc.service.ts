import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TipoDoc } from '../model/tipoDoc';

@Injectable({
  providedIn: 'root'
})
export class TipoDocService {

  private url: string = `${environment.apiUrl}/tipodoc`;

  constructor(private httpClient:HttpClient) { }

  public buscarTodo(): Observable<TipoDoc[]> {
    return this.httpClient.get<TipoDoc[]>(`${this.url}/listar`);
  }
}
