import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../../security/security.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-navbar-left',
  templateUrl: './navbar-left.component.html',
  styleUrls: ['./navbar-left.component.scss']
})
export class NavbarLeftComponent implements OnInit {

  showHideMenuLeft = false;
  user: any;
  account: any;
  path: any;
  readonly URL = environment.apiURL;
  constructor(
    private securityService: SecurityService,
    private route: Router
  ) {
    this.user = securityService.getUser();
    this.account = securityService.getAccount();
  }

  ngOnInit(): void {
    this.path = window.location.pathname;
  }

  showHideMenu(): void {
    this.showHideMenuLeft = !this.showHideMenuLeft;
  }
}
