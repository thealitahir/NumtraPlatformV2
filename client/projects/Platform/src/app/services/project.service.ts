import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    constructor(public http: HttpClient ) {
        console.log('Project Service Initialized...');
    }

    createProject(pName): Observable<any> {
      console.log(pName);
      return this.http.post(GLOBAL.serviceUrl + '/project/createNewProject' , pName);
    }

    getProject(): Observable<any> {
      return this.http.get(GLOBAL.serviceUrl + '/project/getProjects');
    }

    editProject(project): Observable<any> {
      return this.http.post(GLOBAL.serviceUrl + '/project/editProject', project);
    }

    deleteProject(project): Observable<any> {
      return this.http.post(GLOBAL.serviceUrl + '/project/deleteProject', project);
    }

}
