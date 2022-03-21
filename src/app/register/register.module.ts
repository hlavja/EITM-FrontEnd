import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {WebcamModule} from "ngx-webcam";
import {InputTextModule} from "primeng/inputtext";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WebcamModule,
    InputTextModule,
    RouterModule
  ]
})
export class RegisterModule { }
