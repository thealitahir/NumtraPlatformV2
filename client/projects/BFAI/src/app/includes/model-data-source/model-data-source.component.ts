import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { DataSourceService } from '../../services/data-source.service';

export interface OnInit {
  ngOnInit(): void;
}

@Component({
  selector: 'app-model-data-source',
  templateUrl: './model-data-source.component.html',
  styleUrls: ['./model-data-source.component.css']
})

export class ModelDataSourceComponent implements OnInit {

  selectedIndex = 0;

  selectedViewIndex = 0;
  activeTab1 = 'active-tab';
  activeTab2 = '';

 breakpoint: number;

  modelNameSearchQuery: string;
  alldatasources: any ;
  datasources: any;
  datasourcesfeature: any;
  dataSource: any;
  features = [];
  newfeature = {};
  data = {};
  loader = 0 ;

  displayedColumns: string[] = ['img', 'name', 'type'];

  constructor(public dataSourceService: DataSourceService, public snackBar: MatSnackBar) {
    this.loader = 1;
    this.dataSourceService.getalldataSources().subscribe(datasource => {
      console.log(datasource);
    this.alldatasources = JSON.parse(datasource._body);
    this.datasources = this.alldatasources.data;
    this.dataSource = new MatTableDataSource(this.datasources);
    this.dataSource.sort = this.sort;
    this.loader = 0;
    console.log('all data sources ');
    console.log(this.datasources);
    });

  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const element = window.innerWidth;
    this.responsiveGrid(element);

    this.dataSourceService.dataSources().subscribe(datasource => {
      console.log(datasource);
      if (datasource.status === true) {
    this.alldatasources = datasource;
    this.datasources = this.alldatasources.data;
    this.dataSource = new MatTableDataSource(this.datasources);
    this.dataSource.sort = this.sort;
    this.loader = 0;
    console.log('all data sources ');
    console.log(datasource);
      }
    });
  }

  onResize(event) {
    const element = event.target.innerWidth;
    this.responsiveGrid(element);
  }

  responsiveGrid(element) {
    if (element >= 1024) {
      this.breakpoint = 6;
    } else if (element >= 768) {
      this.breakpoint = 4;
    } else if (element >= 300) {
      this.breakpoint = 2;
    }
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  selectView(index: number): void {
    this.selectedViewIndex = index;

    if (index === 0) {
      this.activeTab1 = 'active-tab';
      this.activeTab2 = '';
    }
    if (index === 1) {
      this.activeTab1 = '';
      this.activeTab2 = 'active-tab';
    }

  }


}
