import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const AccessToken = 'AccessToken';

@Injectable({
  providedIn: 'root'
})
export class LocalVNService {

  private readonly URL = environment.apiURL;

  constructor(
    private http: HttpClient,
  ) {
  }

  getCityList(): Observable<any> {
    return this.http.get<any>(this.URL + '/city', httpOptions);
  }

  getDistrictList(id: number): Observable<any> {
    return this.http.get<any>(this.URL + '/district?id=' + id, httpOptions);
  }
  getStreetAndWardList(id: number): Observable<any> {
    return this.http.get<any>(this.URL + '/streetAndWard?id=' + id, httpOptions);
  }
}
