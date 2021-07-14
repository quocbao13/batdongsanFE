import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from '../admin.component';
import {DashboardGuard} from '../../security/dashboardGuard/dashboard-guard';
import {PostCreateComponent} from './post-create/post-create.component';
import {PostListComponent} from './post-list/post-list.component';

const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [DashboardGuard], children: [
      {path: 'post', component: PostListComponent},
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PostRoutingModule { }
