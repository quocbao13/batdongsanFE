import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SecurityRoutingModule} from './security-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule { }
