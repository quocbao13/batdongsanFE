import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HomeService} from '../home.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-post-list',
  templateUrl: './home-post-list.component.html',
  styleUrls: ['./home-post-list.component.scss']
})
export class HomePostListComponent implements OnInit {

  readonly URL = environment.apiURL;
  pageSize = 8;
  pageNumber = 0;
  postForm: FormGroup[] = [];

  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,
    private route: Router
  ) {
  }
  initForm(): any {
    return this.fb.group({
      post: [],
      img: []
    });
  }

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList(): void {
    this.homeService.getPostList(this.pageSize, this.pageNumber).subscribe(data => {
      data.content.forEach((item: any) => {
        this.homeService.getImgByPostId(item.id).subscribe(dataImg => {
          const formFB = this.initForm();
          formFB.get('post').setValue(item);
          if (dataImg.length > 0) {
            formFB.get('img').setValue(dataImg[0].url);
          }
          this.postForm.push(formFB);
        });
      });
    });
  }

  show(post: any): void {
    console.log(post);
  }
}
