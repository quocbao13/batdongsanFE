import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../admin.component';
import {DashboardGuard} from '../../security/dashboardGuard/dashboard-guard';
import {AccountListComponent} from './account-list/account-list.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [DashboardGuard], children: [
      {path: 'account', component: AccountListComponent},
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountRoutingModule { }
