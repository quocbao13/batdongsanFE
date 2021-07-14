import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SecurityService} from '../security/security.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

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

  // post
  getPostList(pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(this.URL + '/admin/post?pageSize=' + pageSize + '&pageNumber=' + pageNumber, this.httpOptions);
  }

  // image
  getImgByPostId(postId: number): Observable<any> {
    return this.http.get(this.URL + '/admin/image?postId=' + postId, this.httpOptions);
  }

  // video
  getVideoByPostId(postId: number): Observable<any> {
    return this.http.get(this.URL + '/admin/video?postId=' + postId, this.httpOptions);
  }
  getPostByTypePurchase(nameTypePurchase: any, pageSize: number, pageNumber: number): Observable<any> {
    return this.http.get(this.URL + '/admin/post/list-post-by-type-purchase?nameTypePurchase=' + nameTypePurchase + '&pageSize=' + pageSize
      + '&pageNumber=' + pageNumber, this.httpOptions);
  }
  getPostById(id: number): Observable<any> {
    return this.http.get(this.URL + '/admin/post/' + id, this.httpOptions);
  }
}
