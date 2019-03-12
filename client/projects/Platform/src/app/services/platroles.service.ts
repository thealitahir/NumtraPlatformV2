import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class PlatRolesService {
  constructor(public http: HttpClient ) {
    console.log('Roles Service Initialized...');
  }

  getById(roleId): Observable<any> {
    return this.http.get(GLOBAL.serviceUrl + '/role/getById/' + roleId );
  }

  getRolesAndPermissions(): Observable<any> {
    return this.http.get(GLOBAL.serviceUrl + '/role/getUserRoles' );
  }

  getExistingRoles(): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/role/getExistingRoles', {});
  }

}
