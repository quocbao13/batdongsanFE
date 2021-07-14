import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SecurityService} from '../../security/security.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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
  save(postDTO: any): Observable<any> {
    return this.http.post(this.URL + '/admin/post/create', postDTO, this.httpOptions);
  }
  saveImg(imageDTO: any): Observable<any> {
    return this.http.post(this.URL + '/admin/image/create', imageDTO, this.httpOptions);
  }
  saveVideo(videoDTO: any): Observable<any> {
    return this.http.post(this.URL + '/admin/video/create', videoDTO, this.httpOptions);
  }
  getPostList(): Observable<any> {
    return this.http.get(this.URL + '/admin/post/list', this.httpOptions);
  }
}
