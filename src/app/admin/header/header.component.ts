import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../../security/security.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;
  account: any;
  constructor(
    private securityService: SecurityService,
    private route: Router
  ) {
    this.user = securityService.getUser();
    this.account = securityService.getAccount();
    securityService.checkToken(securityService.getToken()).subscribe(data => {
      if (!data) {
        securityService.logout();
      }
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.securityService.logout();
    this.route.navigateByUrl('/login');
  }

}
