import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ImageModule} from "primeng/image";
import {TabViewModule} from "primeng/tabview";
import {ProgressSpinnerModule} from "primeng/progressspinner";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    SharedModule,
    ButtonModule,
    RippleModule,
    ImageModule,
    TabViewModule,
    ProgressSpinnerModule
  ]
})
export class DashboardModule { }
