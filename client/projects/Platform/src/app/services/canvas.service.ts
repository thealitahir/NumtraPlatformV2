import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  constructor(public http: HttpClient ) {
    console.log('Sections Service Initialized...');
  }

  onConnection(source,target): Observable<any> {
    var data  = {
      source:source,
      target:target
    }
    return this.http.post(GLOBAL.serviceUrl + '/stage/linkStages' , data );
  }
}
