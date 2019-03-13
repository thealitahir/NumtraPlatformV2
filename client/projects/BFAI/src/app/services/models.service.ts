import {Injectable} from '@angular/core';
// import {Http, Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Socket } from 'ng-socket-io';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class ModelService {
  constructor(public http: HttpClient , private socket: Socket) {
    console.log('Model Service Initialized...');
  }
  getallmodels(): Observable<any> {
    console.log('in models service');
    return this.http.get(GLOBAL.serviceUrl + '/modelApi/getAllModels');

  }
  getModelSource(id): Observable<any> {
    console.log('in model service');
    console.log(id);
    return this.http.get(GLOBAL.serviceUrl + '/modelApi/getModelSource/' + id);
  }
  createPrediction(newdata): Observable<any> {
    console.log('prediction service');
    console.log(newdata);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GLOBAL.serviceUrl + '/modelApi/createPrediction', JSON.stringify(newdata) );

  }
  uploadDataFile(selectedFile): Observable<any> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/upload', fd );
  }

  getPredictionNotify(id): Observable<any> {
    console.log('get prediction notify');
    const observable = new Observable(observer => {
      this.socket.on('onPredictionNotify', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getPredictionResult(id): Observable<any> {
    console.log('get predicition result');
    const observable = new Observable(observer => {
      this.socket.on('onPredictionResult', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
