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

  addLink(source,target): Observable<any> {
    var data  = {
      source:source,
      target:target
    }
    console.log(data);
    return this.http.post(GLOBAL.serviceUrl + '/stage/linkStages' , data );
  }
  removeLink(source,target): Observable<any> {
    var data  = {
      source:source,
      target:target
    }
    return this.http.post(GLOBAL.serviceUrl + '/stage/removeLink' , data );
  }
  saveCanvasModel(pipeline_id,mongoId,elementId,attributes,stage_attributes,position,size,type): Observable<any> {
    var data = {
      pipeline_id:pipeline_id,
      mongoId:mongoId,
      elementId:elementId,
      attributes:attributes,
      stage_attributes:stage_attributes,
      position:position,
      size:size,
      type:type
    }
    return this.http.post(GLOBAL.serviceUrl + '/stage/saveCanvasModel' , data );
  }

  removeStage(stage_id): Observable<any>{
    return this.http.delete(GLOBAL.serviceUrl + '/stage/removeStage/' + stage_id);
  }
  /* removeCanvasModelChild(model): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/stage/linkStages' , model );
  } */

  getCanvasModel(pipeline_id): Observable<any>{
    return this.http.get(GLOBAL.serviceUrl + '/stage/getCanvasModel/'+pipeline_id);
  }
}
