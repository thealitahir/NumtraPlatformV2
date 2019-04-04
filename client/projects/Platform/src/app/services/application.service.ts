import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class ApplicationService {
    constructor(public http: HttpClient ) {
        console.log('Application Service Initialized...');
    }

    createApp(appdata): Observable<any> {
      return this.http.post(GLOBAL.serviceUrl + '/application/createApplication' , appdata);
    }

    getApplications(parentId): Observable<any> {
      return this.http.get(GLOBAL.serviceUrl + '/application/getApplications/' + parentId);
    }

    getPreviousApplications(Id): Observable<any> {
      return this.http.get(GLOBAL.serviceUrl + '/application/getPreviousApplications/' + Id);
    }

    editApp(application): Observable<any> {
      return this.http.post(GLOBAL.serviceUrl + '/application/editApplication', application);
    }

    uploadDataFile(selectedFile): Observable<any> {
      const fd = new FormData();
      fd.append('file', selectedFile, selectedFile.name);
      return this.http.post(GLOBAL.serviceUrl + '/application/upload', fd );
    }

    readAppFile(filepath): Observable<any> {
      return this.http.post(GLOBAL.serviceUrl + '/application/readAppFile' ,  filepath);
    }

    deleteApp(application): Observable<any> {
      return this.http.post(GLOBAL.serviceUrl + '/application/deleteApplication', application);
    }

}
