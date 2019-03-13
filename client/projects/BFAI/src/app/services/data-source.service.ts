import {Injectable} from '@angular/core';
// import {Http, Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Socket } from 'ng-socket-io';
import * as GLOBAL from '../../../../../src/app/global';

@Injectable()
export class DataSourceService {
  constructor(public http: HttpClient , private socket: Socket) {
    console.log('Data Source Service Initialized...');
  }

  userLogin(user): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('in service');
    console.log(user);
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/getUserLogin/' , JSON.stringify(user));
  }

  userLogout(): Observable<any> {

    return this.http.get(GLOBAL.serviceUrl + '/dataSourceApi/logout');
  }

  getCorelationGraph(): Observable<any> {
    return this.http.get(GLOBAL.serviceUrl + '/src/assets/graphData/test.html');
  }

  getdataSource(id): Observable<any> {
    console.log('in service');
    console.log(id);
    return this.http.get(GLOBAL.serviceUrl + '/dataSourceApi/getDataSource/' + id);

  }

  createdataSource(newdataSource): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/createDataSource', JSON.stringify(newdataSource) );

  }

  adddataSourceFeatures(features): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/addDataSourceFeatures', JSON.stringify(features) );

  }

  addTransFeatures(transfeatures): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/addTransFeatures', JSON.stringify(transfeatures));
  }

  relationFeatures(transfeatures): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/relationFeatures', JSON.stringify(transfeatures) );
  }

  getalldataSources(): Observable<any> {
    console.log('in service');
    return this.http.get(GLOBAL.serviceUrl + '/dataSourceApi/getAllDataSources');

  }

  dataSources(): Observable<any> {
    // console.log(id);
    console.log('get Datasrcs');
    const observable = new Observable(observer => {
      this.socket.on('onGetDataSrcs', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getdataFeatures(feature): Observable<any> {
    console.log(feature);
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/getDataFeatures', JSON.stringify(feature) );
  }

  getTransFeatures(id): Observable<any> {
    console.log(id);
    console.log('get trans');
    const observable = new Observable(observer => {
      this.socket.on('ontransnotify', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getModelNotify(id): Observable<any> {
    console.log('get model notify');
    const observable = new Observable(observer => {
      this.socket.on('onmodelnotify', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  loadDataSrcLabel(id): Observable<any> {
    console.log('get datasrc');
    // const usermongoID = localStorage.getItem('currUserID');
    // console.log(usermongoID);
    const observable = new Observable(observer => {
     // this.socket.on('loadDatasrc' + usermongoID , (data) => {
      this.socket.on('loadDataSrcLabel1' , (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  loadDataSrcRem(id): Observable<any> {
    console.log('get datasrc');
    const usermongoID = localStorage.getItem('currUserID');
    console.log(usermongoID);
    const observable = new Observable(observer => {
     // this.socket.on('loadDatasrc' + usermongoID , (data) => {
      this.socket.on('loadDataSrcRem' , (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  loadFeatureLabels(id): Observable<any> {
    console.log('get datasrc');
    const usermongoID = localStorage.getItem('currUserID');
    console.log(usermongoID);
    const observable = new Observable(observer => {
     // this.socket.on('loadDatasrc' + usermongoID , (data) => {
      this.socket.on('loadFeatureLabels' , (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getRelations(id): Observable<any> {
    console.log('get relations');
    const observable = new Observable(observer => {
      this.socket.on('onGetRelations', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getModelResult(id): Observable<any> {
    console.log('get model result');
    const observable = new Observable(observer => {
      this.socket.on('onmodelresult', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getModelExecution(id): Observable<any> {
    console.log('get model execution');
    const observable = new Observable(observer => {
      this.socket.on('onmodelexecution', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  uploadDataFile(selectedFile): Observable<any> {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/upload', fd );
  }



  addS3Profiles(newProfile): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/addS3Profiles', JSON.stringify(newProfile) );
  }

  getS3Bucket(profile): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/getS3Bucket', JSON.stringify(profile) );
  }

  BucketProfile(): Observable<any> {
    console.log('get bucket');
    const observable = new Observable(observer => {
      this.socket.on('bucketProfile', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getProfiles(): Observable<any> {
    return this.http.get(GLOBAL.serviceUrl + '/dataSourceApi/getProfiles/');

  }

  getS3BucketFile(bucket): Observable<any> {
    return this.http.post(GLOBAL.serviceUrl + '/dataSourceApi/readS3File', JSON.stringify(bucket) );
  }

  getProblems(): Observable<any> {
    return this.http.get(GLOBAL.serviceUrl + '/dataSourceApi/getProblems');
  }



}
