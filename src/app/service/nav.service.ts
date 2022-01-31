import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  @Output()
  navAdmin: EventEmitter<boolean> = new EventEmitter;

  @Output()
  navLogin: EventEmitter<boolean> = new EventEmitter;
  
  constructor() { }
}
