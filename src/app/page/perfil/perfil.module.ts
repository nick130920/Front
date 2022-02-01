import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './perfil-routing.module';
import { CardsComponent } from './perfil.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MaterialModule } from 'src/app/material/material.module';
import { CarouselComponent } from '../carousel/carousel.component';


@NgModule({
  declarations: [
    CardsComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MaterialModule
  ]
})
export class CardsModule { }
