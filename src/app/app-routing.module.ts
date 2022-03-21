import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/components/login.component";
import {RegisterComponent} from "./register/components/register.component";
import {DashboardComponent} from "./dashboard/components/dashboard.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },{
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },{
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },  { path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
