import {Component, OnInit} from '@angular/core';
import {HomeService} from '../home.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: any;
  imgList: any;
  idPost: any;
  readonly URL = environment.apiURL;
  indexFile = 0;

  constructor(
    private homeService: HomeService,
    private route: Router
  ) {
    this.idPost = this.route.url.split('-')[this.route.url.split('-').length - 1];
    console.log(this.idPost);
  }

  ngOnInit(): void {
    this.getPostById();
    this.getImgList();
  }

  getPostById(): void {
    this.homeService.getPostById(this.idPost).subscribe(data => {
      this.post = data;
    });
  }

  getImgList(): void {
    this.homeService.getImgByPostId(this.idPost).subscribe(data => {
      this.imgList = data;
      this.homeService.getVideoByPostId(this.idPost).subscribe(dataVideo => {
        dataVideo.forEach((item: any) => {
          this.imgList.push(item);
        });
      });
    });
  }

  changeActiveImg(index: number): void {
    this.indexFile = index;
  }
}
