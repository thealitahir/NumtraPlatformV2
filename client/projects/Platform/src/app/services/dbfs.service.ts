import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class DbfsService {
    constructor(public http: HttpClient ) {
        console.log('Dbfs Service Initialized...');
    }

    getDataSource(path): Observable<any> {
      console.log(path);
        return this.http.post(GLOBAL.serviceUrl + '/dbfs/getDataSource', path);
    }
    getDataFiles(data): Observable<any> {
        console.log(data);
          return this.http.post(GLOBAL.serviceUrl + '/dbfs/getDataFiles', data);
      }
    
}
