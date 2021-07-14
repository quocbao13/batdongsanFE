import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Observable, Subject} from 'rxjs';
import {SecurityService} from '../../security/security.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly URL = environment.apiURL;
  httpOptions: any;
  private eventSaveOrEdit = new Subject<any>();

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

  saveProject(project: any): Observable<any> {
    return this.http.post(this.URL + '/admin/project/create', project, this.httpOptions);
  }

  getProjectList(): Observable<any> {
    return this.http.get(this.URL + '/admin/project');
  }

  getProject(id: number): Observable<any> {
    return this.http.get(this.URL + '/admin/project/' + id);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.get(this.URL + '/admin/project/delete/' + id);
  }

  listenSaveOrEdit(): Observable<any> {
    return this.eventSaveOrEdit.asObservable();
  }

  getDataToListenSaveOrEdit(): void {
    this.getProjectList().subscribe(data => {
      this.eventSaveOrEdit.next(data);
    });
  }
}
