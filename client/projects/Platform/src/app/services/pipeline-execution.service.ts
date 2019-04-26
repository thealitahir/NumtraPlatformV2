import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global'

@Injectable({
  providedIn: 'root'
})
export class PipelineExecutionService {

  constructor(public http: HttpClient ) { }

  saveProfile(data): Observable<any>{
    return this.http.post(GLOBAL.serviceUrl + '/pipeline/createProfile', data);
  }
  getProfile(): Observable<any>{
    return this.http.get(GLOBAL.serviceUrl + '/pipeline/');
  }
  getClusters(selected_profile): Observable<any>{
    return this.http.post(GLOBAL.serviceUrl + '/pipeline/getClusters' , selected_profile);
  }
  executePipeline(data): Observable<any>{
    return this.http.post(GLOBAL.serviceUrl + '/pipeline/executePipeline' , data);
  }
}
