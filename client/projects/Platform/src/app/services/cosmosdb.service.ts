import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class CosmosdbService {
    constructor(public http: HttpClient ) {
        console.log('Dbfs Service Initialized...');
    }

    getDataSource(data): Observable<any> {
      console.log(data);
        return this.http.post(GLOBAL.serviceUrl + '/cosmos/getdataSource', data);
    }

}
