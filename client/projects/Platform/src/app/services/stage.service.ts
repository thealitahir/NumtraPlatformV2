import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as GLOBAL from '../../../../../src/app/global';
import { Socket } from 'ng-socket-io';

@Injectable()
export class StageService {
    constructor(private socket: Socket, public http: HttpClient ) {
        console.log('Sections Service Initialized...');
    }

    updateStage(data): Observable<any> {
        return this.http.post(GLOBAL.serviceUrl + '/stage/updateStage', data);
    }

    getSections(): Observable<any> {
      return this.http.get(GLOBAL.serviceUrl+'/sections/');
    }

    getComponents():Observable<any>{
      return this.http.get(GLOBAL.serviceUrl+'/components/');
    }

    getStage(id : string): Observable<any>{
      return this.http.get(GLOBAL.serviceUrl+'/components/'+id);
    }

    getStageSchema(stageName,stageType): Observable<any>{
      return this.http.get(GLOBAL.serviceUrl + '/stage/stageSchema/' + stageName + '/' +stageType );
    }

    saveComponent(stage:any): Observable<any>{
      return this.http.post(GLOBAL.serviceUrl + '/components/saveComponent', stage);
    }

    updateComponent(stage:any){
      return this.http.put(GLOBAL.serviceUrl + '/components/updateComponent', stage);
    }

    getpipelineData(): Observable<any> {
      console.log('onPipelineData');
      const observable = new Observable(observer => {
        this.socket.on('onPipelineData', (data) => {
          observer.next(data);
        });
      });
      return observable;
    }

    executePipeline(processID): Observable<any> {
      return this.http.post(GLOBAL.serviceUrl + '/stage/executePipeline', processID);
  }
}
