import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeContentComponent} from './home-content/home-content.component';
import {SellPostListComponent} from './sell-post-list/sell-post-list.component';
import {PostDetailComponent} from './post-detail/post-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: '', component: HomeContentComponent},
      {path: 'ban-nha-dat', component: SellPostListComponent},
      {path: 'bai-dang/:id', component: PostDetailComponent}
    ]}
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeRoutingModule { }
