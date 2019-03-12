import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class ComponentsService {
    constructor(public http: HttpClient ) {
        console.log('Sections Service Initialized...');
    }

    getComponents(): Observable<any> {
        return this.http.get(GLOBAL.serviceUrl + '/components/');
    }

}
