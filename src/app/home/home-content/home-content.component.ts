import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  readonly URL = environment.apiURL;
  openCloseInputSearch = false;
  constructor() { }

  ngOnInit(): void {
  }

  openInputSearch(): void {
    this.openCloseInputSearch = !this.openCloseInputSearch;
  }
}
