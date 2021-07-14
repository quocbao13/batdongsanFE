import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment.prod';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const AccessToken = 'AccessToken';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private readonly URL = environment.apiURL;

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {
  }

  register(registrationRequest: any): Observable<any> {
    return this.http.post<any>(this.URL + '/register', registrationRequest, httpOptions).pipe(tap(res => {
      this.login(registrationRequest);
    }));
  }

  login(request: any): Observable<any> {
    return this.http.post<any>(this.URL + '/auth', request).pipe(tap(res => {
      localStorage.setItem(AccessToken, JSON.stringify(res));
    }));
  }

  getUser(): any {
    if (this.loggedIn) {
      return JSON.parse(<string> localStorage.getItem(AccessToken)).userEntity;
    } else {
      return null;
    }
  }

  getAccount(): any {
    if (this.loggedIn) {
      return JSON.parse(<string> localStorage.getItem(AccessToken)).account;
    } else {
      return null;
    }
  }

  getToken(): any {
    if (this.loggedIn) {
      return JSON.parse(<string> localStorage.getItem(AccessToken)).token;
    } else {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(AccessToken);
    this.route.navigateByUrl('/login');
  }

  public get loggedIn(): boolean{
    return localStorage.getItem(AccessToken) !==  null;
  }
  checkToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.URL + '/checkToken', token);
  }
}
