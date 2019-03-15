import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class DbfsService {
    constructor(public http: HttpClient ) {
        console.log('Dbfs Service Initialized...');
    }

    getDataSource(): Observable<any> {
        return this.http.get(GLOBAL.serviceUrl + '/dbfs/getDataSource');
    }

}
