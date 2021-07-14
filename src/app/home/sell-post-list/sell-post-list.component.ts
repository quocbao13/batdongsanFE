import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HomeService} from '../home.service';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-sell-post-list',
  templateUrl: './sell-post-list.component.html',
  styleUrls: ['./sell-post-list.component.scss']
})
export class SellPostListComponent implements OnInit {

  postForm: FormGroup[] = [];
  readonly URL = environment.apiURL;
  constructor(
    private homeService: HomeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPostList();
  }

  initForm(): any {
    return this.fb.group({
      post: [],
      img: []
    });
  }

  getPostList(): void {
    this.homeService.getPostByTypePurchase('Bán', 20, 0).subscribe(data => {
      data.forEach(async (item: any) => {
        this.homeService.getImgByPostId(item.id).subscribe(dataImg => {
          const formFB = this.initForm();
          formFB.get('post').setValue(item);
          console.log(item);
          formFB.get('img').setValue(dataImg[0].url);
          this.postForm.push(formFB);
        });
      });
    });
  }
}
