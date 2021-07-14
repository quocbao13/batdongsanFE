import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SecurityService} from '../../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class TypeHouseService {

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

  getTypeHouseList(): Observable<any> {
    return this.http.get(this.URL + '/admin/type-house', this.httpOptions);
  }

  createTypeHouse(typeHouseDTO: any): Observable<any> {
    return this.http.post(this.URL + '/admin/type-house/create', typeHouseDTO, this.httpOptions);
  }

  checkDuplicateName(name: any): Observable<any> {
    return this.http.get(this.URL + '/admin/type-house/check-duplicate?name=' + name, this.httpOptions);
  }

  getTypeHouse(id: number): Observable<any> {
    return this.http.get(this.URL + '/admin/type-house/' + id, this.httpOptions);
  }

  deleteTypeHouse(id: number): Observable<any> {
    return this.http.get(this.URL + '/admin/type-house/delete/' + id, this.httpOptions);
  }
}
