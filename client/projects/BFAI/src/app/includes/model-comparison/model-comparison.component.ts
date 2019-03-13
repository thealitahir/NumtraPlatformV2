import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../services/data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-model-comparison',
  templateUrl: './model-comparison.component.html',
  styleUrls: ['./model-comparison.component.css']
})

export class ModelComparisonComponent implements OnInit {
  mresult: any;
  modelresult: any;
  ml_status: any;
  loader = 0;
  data_type: any;
  execution_status: any;
  execution_result: any = '';
  gen: any;
  time: any;
  logsLoaderTime: any;
  bestModelName: any;
  bestModelAccuracy: any = 0;
  bestModelGeneration: any;
  bestModelFeatureTrasformation: any;
  graphFile: any;
  auc_plot: any;
  fullGraph = false;
  fullGraphWidth: any = 50;
  total_correctly_classify: any;
  total_not_correctly_classify: any;

  constructor(
    public dataSourceService: DataSourceService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer

  ) {
    this.loader = 1;
    this.execution_status = 0;
    const idparam = this.route.snapshot.paramMap.get('id');
    const indexparam = this.route.snapshot.paramMap.get('index');
    this.dataSourceService.getdataSource(idparam).subscribe(datasource => {
       this.mresult = JSON.parse(datasource._body);
      // this.modelresult = this.mresult.data.ml_result;
      // this.ml_status = this.mresult.data.ml_status;
      // this.data_type = this.mresult.data.data_type;
        this.modelresult = this.mresult.data.Features_Stat[indexparam];
       this.loader = 0;

       console.log(this.modelresult);
    });
  }


  lineGraphData =  [
    {
      'name': 'Accuracy',
      'series': []
    }
  ];

  // view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Generation';
  showYAxisLabel = true;
  yAxisLabel = 'Accuracy';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    const idparam = this.route.snapshot.paramMap.get('id');
    this.ml_status = 0;
    this.dataSourceService.getModelResult(idparam).subscribe(mresult => {
      this.modelresult = mresult.ml_result;
      this.ml_status = mresult.ml_status;
      this.data_type = mresult.data_type;
      this.execution_status = 0;
      if (this.modelresult[0].plot_encoded_string !== '0') {
        this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.modelresult[0].plot_encoded_string);
      } else {
        this.graphFile = 0;
      }
      this.total_correctly_classify = this.modelresult[0].total_correctly_classify;
      this.total_not_correctly_classify = this.modelresult[0].total_not_correctly_classify;
      this.auc_plot = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.modelresult[0].auc_plot);
      // console.log(this.modelresult[0].plot_encoded_string);
      console.log(this.modelresult);

      // this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.modelresult.plot_encoded_string);
      // this.auc_plot = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.modelresult.auc_plot);
      // console.log(mresult);

      this.openSnackBar('SUCCESS:', mresult.message);
    });

    this.dataSourceService.getModelExecution(idparam).subscribe(mresult => {

      if (mresult !== '') {

        if (mresult.result.Best_model !== '') {

          if (mresult.result.Accuracy !== '' && mresult.result.Accuracy >= this.bestModelAccuracy) {
            this.bestModelGeneration = mresult.result.generation;
            this.bestModelName = mresult.result.Best_model;
            this.bestModelAccuracy = mresult.result.Accuracy;
            this.bestModelFeatureTrasformation = mresult.result.feature_trasformation;
          }

          this.lineGraphData[0].series.push({
            'name': mresult.result.generation,
            'value': mresult.result.Accuracy
          });

          this.lineGraphData = [...this.lineGraphData];

          console.log('==========Best Models Graph Data=============');
          console.log(this.lineGraphData);
        }

        console.log('==========Models Data=============');
        console.log(mresult.result);

        if (this.gen !== mresult.result.generation) {

          this.execution_result = '';

          this.execution_result +=
            '<thead>' +
            '<tr>' +
            '<th colspan="3">Generation: ' +
            mresult.result.generation +
            '</th>' +
            '</tr>' +
            '<tr>' +
            '<th>Model Name</th>' +
            '<th>Feature Trasformation</th>' +
            '<th>Score</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr>' +
            '<td>' +
            mresult.result.model +
            '</td>' +
            '<td>' +
            mresult.result.feature_trasformation +
            '</td>' +
            '<td>' +
            mresult.result.Accuracy +
            '</td>' +
            '</tr>' +
            '<tbody>';

          this.execution_status = mresult.execution_status;
          this.gen = mresult.result.generation;

        } else {

          this.execution_result +=
            '<tr>' +
            '<td>' +
            mresult.result.model +
            '</td>' +
            '<td>' +
            mresult.result.feature_trasformation +
            '</td>' +
            '<td>' +
            mresult.result.Accuracy +
            '</td>' +
            '</tr>';

          this.execution_status = mresult.execution_status;
        }
      }
      // console.log(this.execution_result);
      // this.openSnackBar('SUCCESS:', 'execution data received' );
    });


    // this.time = 60 * 3;
    // let _i = 0;
    // while (_i < this.time) {
    //   this.delay(1000).then(any => {
    //     // your task after delay.
    //     _i++;
    //     this.logsLoaderTime = _i;
    //     console.log(this.logsLoaderTime);
    //   });

    // }

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
