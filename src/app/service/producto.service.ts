import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = `${environment.apiUrl}/producto`;

  constructor(
    private http: HttpClient
  ) { }

  buscarTodo(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/listar`);
  }
  buscarId(id:number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/listaProductoPorCodigo/${id}`);
  }

  buscarProductosPorCategoria(codigo:Number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/listar-por-categoria/${codigo}`);
  }

  crear(imagen:File,json:Producto): Observable<void> {
    let formData:FormData=new FormData();
    formData.set('imagen',imagen);
    formData.set('json',JSON.stringify(json));
    return this.http.post<void>(`${this.url}/insertar`, formData);
  }

  editar(imagen:File,json:Producto): Observable<void> {
    let formData:FormData=new FormData();
    formData.set('imagen',imagen);
    formData.set('json',JSON.stringify(json));
    return this.http.put<void>(`${this.url}/actualizar`, formData)
  }

  editarSinImagen(json:Producto): Observable<void> {
    let formData:FormData=new FormData();
    formData.set('json',JSON.stringify(json));
    return this.http.put<void>(`${this.url}/actualizar-sin-imagen`, formData)
  }

  eliminar(producto: Producto): Observable<void> {
    return this.http.put<void>(`${this.url}/eliminar`, producto);
  }

  buscarAdmin(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.url}/listar-admin`);
  }
}
