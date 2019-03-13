import { Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataSourceService } from '../../services/data-source.service';
import { ModelService } from '../../services/models.service';
export interface OnInit {
  ngOnInit(): void;
}

@Component({
  selector: 'app-model-dashoard',
  templateUrl: './model-dashboard.component.html',
  styleUrls: ['./model-dashboard.component.css']
})

export class ModelDashboardComponent implements OnInit {
  alldata: any;
  allmodels: any ;
  models: any;
  loader = 0;
  dataSource = new MatTableDataSource(this.allmodels);

  displayedColumns: string[] = ['sn', 'name', 'type', 'action'];

  constructor(public dataSourceService: DataSourceService, public modelsService: ModelService , public snackBar: MatSnackBar) {
    this.loader = 1;
    this.modelsService.getallmodels().subscribe(datasource => {
     this.models = JSON.parse(datasource._body);
     console.log(this.models);
     this.alldata = this.models.collectionData;
     this.allmodels = this.alldata.reverse();
     this.dataSource = new MatTableDataSource(this.allmodels);
     this.dataSource.sort = this.sort;
     this.loader = 0;
    console.log('all models ');
    console.log(this.models);
    console.log(this.models.collectionData);
    });

  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.dataSource.sort = this.sort;
  }

}
