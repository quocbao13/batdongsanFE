import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SecurityService} from '../../security/security.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypePostService {

  private readonly URL = environment.apiURL;
  httpOptions: any;

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ` + this.securityService.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getTypePostList(): Observable<any> {
    return this.http.get<any>(this.URL + '/admin/type-post', this.httpOptions);
  }
}
