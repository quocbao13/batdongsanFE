import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-hearder-home',
  templateUrl: './hearder-home.component.html',
  styleUrls: ['./hearder-home.component.scss']
})
export class HearderHomeComponent implements OnInit {

  readonly URL = environment.apiURL;
  constructor() { }

  ngOnInit(): void {
  }

}
