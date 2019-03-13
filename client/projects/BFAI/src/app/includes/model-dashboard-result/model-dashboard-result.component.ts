import { Component, OnInit } from '@angular/core';
import {MatSort, MatTableDataSource, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { DataSourceService } from '../../services/data-source.service';
import { ModelService } from '../../services/models.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-model-dashoard-result',
  templateUrl: './model-dashboard-result.component.html',
  styleUrls: ['./model-dashboard-result.component.css']
})

export class ModelDashboardResultComponent implements OnInit {
  mresult: any ;
  modelresult: any ;
  ml_result: any;
  description: any;
  testlocation = '';
  sourceLink = '';
  modelLocation = '';
  error = '';
  selectedFile: File = null;
  uploadres: any;
  newdata: any;
  data: any;
  datasource_id: any ;
  modeldashboard_id: any;
  prediction_data: any;
  prediction_status: any ;
  loader = 0;
  mainloader = 0;
  lineChartData: Array<any> = [];
  lineChartLabels: Array<any> = [];
  data_type: any;
  rel_data: any;
  fullGraph = false;
  fullGraphWidth: any = 50;
  graphFile: any ;
  auc_plot: any;
  total_correctly_classify: any;
  total_not_correctly_classify: any;


  constructor(public dataSourceService: DataSourceService, private route: ActivatedRoute, private domSanitizer: DomSanitizer,
    private router: Router , public modelsService: ModelService , public snackBar: MatSnackBar) {
      this.mainloader = 1;
    const idparam = this.route.snapshot.paramMap.get('id');
    this.modelsService.getModelSource(idparam).subscribe(datasource => {
      console.log(datasource);
       this.modelresult = JSON.parse(datasource._body);
       this.mresult = this.modelresult.data;
       this.description = this.mresult.DataSourceName;
       this.modelLocation = this.mresult.ml_result.model_location;
       this.rel_data = this.mresult.rel_data;
      this.datasource_id = this.mresult.datasource_id;
      this.modeldashboard_id = this.mresult._id;
      this.prediction_status = this.mresult.prediction_status;
      this.prediction_data = this.mresult.prediction_result;
      this.mainloader = 0;
      this.data_type = this.mresult.data_type;
      if (this.mresult.ml_result.plot_encoded_string !== '0') {
        this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.mresult.ml_result.plot_encoded_string);
      } else {
        this.graphFile = 0;
       }
      this.total_correctly_classify = this.mresult.ml_result.total_correctly_classify;
      this.total_not_correctly_classify = this.mresult.ml_result.total_not_correctly_classify;
      // this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.mresult.ml_result.plot_encoded_string);
      this.auc_plot = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.mresult.ml_result.auc_plot);
       console.log('=======================');
       console.log(this.prediction_data);
       // this.ml_result = this.mresult.ml_result;
      console.log('model result data');

      this.lineChartData = [
        {data: this.prediction_data.True_label, label: 'Actual'},
        {data: this.prediction_data.prediction, label: 'Predicted'}
      ];

      this.lineChartLabels = new Array(this.prediction_data.True_label.length);

    });

  }




  public lineChartOptions: any = {
    responsive: true
  };
  // public lineChartColors: Array<any> = [
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   },
  //   { // dark grey
  //     backgroundColor: 'rgba(77,83,96,0.2)',
  //     borderColor: 'rgba(77,83,96,1)',
  //     pointBackgroundColor: 'rgba(77,83,96,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77,83,96,1)'
  //   },
  //   { // grey
  //     backgroundColor: 'rgba(148,159,177,0.2)',
  //     borderColor: 'rgba(148,159,177,1)',
  //     pointBackgroundColor: 'rgba(148,159,177,1)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  //   }
  // ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    const idparam = this.route.snapshot.paramMap.get('id');
    this.modelsService.getPredictionNotify(idparam).subscribe(modelnotify => {
      // this.notify = modelnotify.message;
      // this.datasourceid = transfeature.mongo_id;
      // this.tfd_status = transfeature.tfd_status;
      console.log('model notify angular');
      console.log(modelnotify.message);
      // console.log(transfeature.MongoData);

      this.openSnackBar('SUCCESS:', modelnotify.message );
     // this.router.navigate(['/model-comparison/' + idparam ]);
    });
    this.modelsService.getPredictionResult(idparam).subscribe(modelresult => {
      // this.notify = modelnotify.message;
      // this.datasourceid = transfeature.mongo_id;
      // this.tfd_status = transfeature.tfd_status;
      this.loader = 0;
      console.log('model prediction result angular');
      console.log(modelresult);
      // console.log(transfeature.MongoData);
      this.prediction_data = modelresult.prediction_result;
      this.prediction_status = modelresult.prediction_status;
      this.lineChartData = [
        {data: this.prediction_data.True_label, label: 'Actual'},
        {data: this.prediction_data.prediction, label: 'Predicted'}
      ];

      this.lineChartLabels = new Array(this.prediction_data.True_label.length);
      this.openSnackBar('SUCCESS:', modelresult.message );
     // this.router.navigate(['/model-comparison/' + idparam ]);
    });
  }

  onSubmitPrediction(form: NgForm) {
    // console.log('hello');
     console.log(form);
     if ( this.description === '' || this.testlocation === '') {
        this.error = 'Please fill all the Fields';
        this.openSnackBar('ERROR:', 'Please fill all the Fields');
     } else {
      this.newdata = {
        name: form.value.description,
        testlocation: form.value.testlocation,
        model_location: form.value.modelLocation,
        datasource_id: this.datasource_id,
        modeldashboard_id: this.modeldashboard_id,
        rel_data: this.rel_data
      };
      this.loader = 1;
      this.modelsService.createPrediction(this.newdata).subscribe(datasource => {
       // console.log('hello data');
        console.log(datasource);
        // this.data = JSON.parse(datasource._body);
        // this.description = '';
        // this.testlocation = '';
        // this.modelLocation = '';
        console.log('prediction form');
        // this.router.navigate(['/data-source']);
      });
     }
  }

  onPredicitionFileSelect(event) {
    console.log('upload file event ');
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.modelsService.uploadDataFile(this.selectedFile).subscribe(uploadresponse => {
      this.uploadres = JSON.parse( uploadresponse._body );
      const path = '/home/adnansohail/business-first-ai-platform-dev/business-first-ai-platform/uploads/';
      this.testlocation = path + this.uploadres.uploadname;
      this.openSnackBar('Success:', 'File uploaded successfully!');
      console.log('upload file ');
      console.log(this.testlocation);
      console.log(uploadresponse);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onLinkClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab);

    window.dispatchEvent(new Event('resize'));
  }

  fulScreenGraph() {
    this.fullGraph = true;
    this.fullGraphWidth = 100;
  }
  exitFulScreenGraph() {
    this.fullGraphWidth = 50;
    setTimeout(() => {
      this.fullGraph = false;
 }, 1000);
  }
}
