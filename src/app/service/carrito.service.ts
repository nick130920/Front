import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/';
import { Carrito } from '../model/carrito';

@Injectable({ providedIn: 'root'})

export class CarritoService {
  private carrito$ = new Subject<Carrito[]>();

  setData(carrito: Carrito[]) {
    // console.log(carrito);
    // let carro:Carrito[];
    // carro=[];
    try {
      // carro.push(carrito);
      let jsonData = JSON.stringify(carrito);
      console.log(carrito);
      this.carrito$.next(carrito);
      localStorage.setItem('carrito', jsonData);

    } catch (error) {
      console.log(error);
    }
  }
  getData$(): Observable<Carrito[]>{
    try {
      return this.carrito$.asObservable();
    } catch (error) {
      console.log(error);
    }
  }
  getData(){
    try {
      return JSON.parse(localStorage.getItem('carrito'));

    } catch (error) {
      console.log(error);
    }
  }
  removeData(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
 }
 clear(): void {
   try {
     localStorage.clear();
   } catch (error) {
    console.log(error);
   }
 }
}
