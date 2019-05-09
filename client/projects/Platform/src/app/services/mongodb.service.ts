import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {
    constructor(public http: HttpClient ) {
        console.log('Dbfs Service Initialized...');
    }

    getDataSource(data): Observable<any> {
        return this.http.post(GLOBAL.serviceUrl + '/mongo/getdataSource', data);
    }

}
