import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable({
  providedIn: 'root'
})
export class CreateFileService {
    constructor(public http: HttpClient ) {
        console.log('Create File Service Initialized...');
    }

    writeFile(data): Observable<any> {
      console.log('write file');
        console.log(data);
          return this.http.post(GLOBAL.serviceUrl + '/fwrite/writeCsv', data);
      }

}
