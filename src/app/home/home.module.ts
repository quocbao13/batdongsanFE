import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HearderHomeComponent } from './hearder-home/hearder-home.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { PostSearchListComponent } from './post-search-list/post-search-list.component';
import { HomePostListComponent } from './home-post-list/home-post-list.component';
import {CustomPricePipe} from '../custom-price.pipe';
import { SellPostListComponent } from './sell-post-list/sell-post-list.component';
import {CustomDescriptionPipe} from '../custom-description.pipe';
import { PostDetailComponent } from './post-detail/post-detail.component';
import {CustomSubjectPostPipe} from '../custom-subject-post.pipe';



@NgModule({
    declarations: [
        HomeComponent,
        HearderHomeComponent,
        HomeContentComponent,
        PostSearchListComponent,
        HomePostListComponent,
        CustomPricePipe,
        SellPostListComponent,
        CustomDescriptionPipe,
        PostDetailComponent,
        CustomSubjectPostPipe
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ]
})
export class HomeModule { }
