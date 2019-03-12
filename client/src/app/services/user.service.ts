import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Socket } from 'ng-socket-io';
import * as GLOBAL from '../global';

@Injectable()
export class UsersService {
  constructor(public http: HttpClient ) {
    console.log('User Service Initialized...');
  }

  userLogin(user): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/api/userlogin' , user );
  }

  userLogout(): Observable<any> {
    return this.http.get(GLOBAL.serviceUrl + '/logout');
  }


}
