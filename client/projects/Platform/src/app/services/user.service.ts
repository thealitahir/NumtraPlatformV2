import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Socket } from 'ng-socket-io';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class UsersService {
  constructor(public http: HttpClient, private socket: Socket ) {
    console.log('User Service Initialized...');
  }

  userLogin(user): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/api/userlogin' , user );
  }

  userLogout(): Observable<any> {
    return this.http.get(GLOBAL.serviceUrl + '/logout');
  }

  // getUserDetails(): Observable<any> {
    //return this.http.get(GLOBAL.serviceUrl+'/api/login');
    //return this.http.get(GLOBAL.serviceUrl + '/user');
    // console.log(id);
    // console.log('get user Data');
    // const observable = new Observable(observer => {
    //   this.socket.on('userDetail', (data) => {
    //     observer.next(data);
    //   });
    // });
    // return observable;
  //}

}
