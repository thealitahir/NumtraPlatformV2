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
    console.log(data);
    return this.http.post(GLOBAL.serviceUrl + '/stage/linkStages' , data );
  }
  saveCanvasModel(attributes,position,size,type): Observable<any> {
    var data = {
      attributes:attributes,
      position:position,
      size:size,
      type:type
    }
    return this.http.post(GLOBAL.serviceUrl + '/stage/saveCanvasModel' , data );
  }
  removeCanvasModelChild(model): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/stage/linkStages' , model );
  }
  getCanvasModel(): Observable<any>{
    return this.http.get(GLOBAL.serviceUrl + '/stage/getCanvasModel');
  }
}