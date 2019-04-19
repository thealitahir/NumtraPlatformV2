import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable({
  providedIn: 'root'
})
export class BlobService {
    constructor(public http: HttpClient ) {
        console.log('Dbfs Service Initialized...');
    }

    getContainers(cred): Observable<any> {
        return this.http.post(GLOBAL.serviceUrl + '/blob/getContainers', cred);
    }

    getBlobsList(cred): Observable<any> {
        return this.http.post(GLOBAL.serviceUrl + '/blob/getBlobsList', cred);
    }

    getBlob(cred): Observable<any> {
        return this.http.post(GLOBAL.serviceUrl + '/blob/getBlob', cred);
    }
}
