import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import { HeaderComponent } from './header/header.component';
import { NavbarLeftComponent } from './navbar-left/navbar-left.component';
import {RouterModule} from '@angular/router';
import {AccountModule} from './account/account.module';
import {HttpClientModule} from '@angular/common/http';
import {PostModule} from './post/post.module';
import {ProjectModule} from './project/project.module';
import {TypeHouseModule} from './type-house/type-house.module';



@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    NavbarLeftComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    AccountModule,
    HttpClientModule,
    PostModule,
    ProjectModule,
    TypeHouseModule
  ]
})
export class AdminModule { }
