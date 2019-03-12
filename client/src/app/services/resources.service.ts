import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../global';

@Injectable()
export class ResourcesService {
    constructor(public http: HttpClient ) {
        console.log('Resources Service Initialized...');
    }

    getResources(): Observable<any> {
        return this.http.get(GLOBAL.serviceUrl + '/resources/');
    }

}
