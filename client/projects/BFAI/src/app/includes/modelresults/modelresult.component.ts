import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { DataSourceService } from '../../services/data-source.service';

export interface OnInit {
  ngOnInit(): void;
}

@Component({
  selector: 'app-model-result',
  templateUrl: './modelresult.component.html',
  styleUrls: ['./modelresult.component.css']
})

export class ModelResultComponent implements OnInit {

  selectedIndex = 0;
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
  loader = 0;

  displayedColumns: string[] = ['img', 'name', 'type'];

  constructor(public dataSourceService: DataSourceService, public snackBar: MatSnackBar) {
    this.loader = 1;
    this.dataSourceService.getalldataSources().subscribe(datasource => {
    this.datasources = JSON.parse(datasource._body);
    this.alldatasources = this.datasources.data;
    this.dataSource = new MatTableDataSource(this.alldatasources);
    this.dataSource.sort = this.sort;
    console.log('all data sources ');
    console.log(this.alldatasources);
    this.loader = 0;
    });

  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const element = window.innerWidth;
    this.responsiveGrid(element);
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
