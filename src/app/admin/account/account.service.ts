import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly URL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getAccountList(): Observable<any> {
    return this.http.get<any>(this.URL + '/admin/account/', httpOptions);
  }
}
