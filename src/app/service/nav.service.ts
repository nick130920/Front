import { Injectable, Output, EventEmitter } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  @Output()
  navAdmin: EventEmitter<boolean> = new EventEmitter;

  @Output()
  navLogin: EventEmitter<boolean> = new EventEmitter;

  @Output()
  productos: EventEmitter<Producto[]> = new EventEmitter;

  constructor() { }
}
