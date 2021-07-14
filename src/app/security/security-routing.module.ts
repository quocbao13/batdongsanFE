import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {DashboardGuard} from './dashboardGuard/dashboard-guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent, canActivate: [DashboardGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SecurityRoutingModule { }
