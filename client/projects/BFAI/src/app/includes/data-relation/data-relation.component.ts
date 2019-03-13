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
  selector: 'app-data-relation',
  templateUrl: './data-relation-view.component.html',
  styleUrls: ['./data-relation-view.component.css']
})

export class DataRelationComponent implements OnInit {
  alldata: any;
  allmodels: any ;
  models: any;
  loader = 0;
  datasources: any;
  datasourceid: any;
  datasourcelocation: any;
  newfeature: any;
  features: any;

  constructor(public dataSourceService: DataSourceService, private route: ActivatedRoute,
    private socket: Socket , public snackBar: MatSnackBar) {
    const idparam = this.route.snapshot.paramMap.get('id');
    this.loader = 1;
    this.dataSourceService.getdataSource(idparam).subscribe(datasource => {
      this.datasources = JSON.parse(datasource._body);
      this.datasourceid = this.datasources.data._id;
      this.datasourcelocation = this.datasources.data.locationMerged;
      this.features = this.datasources.data.entity_features;
      console.log(this.datasources.data.entity_features);
      this.loader = 0;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

}
