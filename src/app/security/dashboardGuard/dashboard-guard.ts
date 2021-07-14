import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from '../security.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate{

  constructor(
    private securityService: SecurityService,
    private route: Router,
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.securityService.loggedIn) {
      if (this.securityService.getUser().roleEntity.name == 'ROLE_ADMIN') {
        return true;
      } else {
        return this.route.navigateByUrl('/');
      }
    }else {
      return this.route.navigateByUrl('/login');
    }

  }
}
