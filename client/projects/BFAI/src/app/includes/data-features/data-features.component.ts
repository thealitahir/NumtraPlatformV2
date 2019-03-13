import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataSourceService } from '../../services/data-source.service';
import { ModelService } from '../../services/models.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ng-socket-io';
export interface OnInit {
  ngOnInit(): void;
}

@Component({
  selector: 'app-data-features',
  templateUrl: './data-features.component.html',
  styleUrls: ['./data-features.component.css'],
})

export class DataFeaturesComponent implements OnInit {
  alldata: any;
  allmodels: any ;
  models: any;
  loader = 0;
  datasources: any;
  datasourceid: any;
  datasourcelocation: any;
  fdata: any;
  feature: any;
  featuresdata: any;
  graphdata: any = [];
  gdata: any = {};
  graphKeys = [];

  constructor(public dataSourceService: DataSourceService, private route: ActivatedRoute,
    private socket: Socket , public snackBar: MatSnackBar) {
    const pathparam = this.route.snapshot.paramMap.get('entity');
    console.log(pathparam);
    this.loader = 1;
    this.feature = {filepath: pathparam};
    console.log(this.feature);
    // this.dataSourceService.getdataFeatures(this.feature).subscribe(datasource => {
    //  console.log(datasource);
    //    this.featuresdata = JSON.parse(datasource._body);
    //   this.fdata =   this.featuresdata.filedata;
    //   // this.datasourceid = this.datasources.data._id;
    //   // this.datasourcelocation = this.datasources.data.locationMerged;
    //   // this.features = this.datasources.data.entity_features;
    //   //  console.log(this.fdata);
    //   this.graphdata = this.fdata.slice(0, 12);
    //   console.log('array slice');
    //   console.log(this.graphdata);
    //   this.graphKeys = Object.keys( this.graphdata[0] );
    //   this.graphKeys.forEach(key => {
    //     this.gdata[key] = [];
    //    } );
    //    this.graphdata.forEach( (obj, index) => {
    //     this.graphKeys.forEach(key => {
    //       this.gdata[key].push(
    //         {
    //           name: index + 1,
    //           value: obj[key]
    //         }
    //       );
    //      });
    //    });
    //    console.log('graph array');
    //    console.log(this.gdata);
    //    console.log(this.fdata);
    //   this.loader = 0;
    // });
  }

  single = [
    {
      'name': '1',
      'value': 15
    },
    {
      'name': '2',
      'value': 20
    },
    {
      'name': '3',
      'value': 5
    },
    {
      'name': '4',
      'value': 15
    },
    {
      'name': '5',
      'value': 20
    },
    {
      'name': '6',
      'value': 5
    },
    {
      'name': '7',
      'value': 15
    },
    {
      'name': '8',
      'value': 20
    },
    {
      'name': '9',
      'value': 5
    },
    {
      'name': '10',
      'value': 15
    },
    {
      'name': '11',
      'value': 20
    },
    {
      'name': '12',
      'value': 5
    }


  ];

  view: any[] = [150, 100];
  showXAxis = true;
  xAxisTicks = [1, 12];
  colorScheme = {
    domain: ['#3f51b5']
  };

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

}
