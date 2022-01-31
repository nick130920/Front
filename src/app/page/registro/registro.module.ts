import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    NgxCaptchaModule,
    RegistroRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    MatCheckboxModule
  ]
})
export class RegistroModule { }
