import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../admin.component';
import {DashboardGuard} from '../../security/dashboardGuard/dashboard-guard';
import {TypeHouseListComponent} from './type-house-list/type-house-list.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [DashboardGuard], children: [
      {path: 'type-house', component: TypeHouseListComponent},
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TypeHouseRoutingModule { }
