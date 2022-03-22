import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {WebcamModule} from "ngx-webcam";
import {InputTextModule} from "primeng/inputtext";
import {RouterModule} from "@angular/router";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WebcamModule,
    InputTextModule,
    RouterModule,
    ToastModule
  ]
})
export class RegisterModule { }
