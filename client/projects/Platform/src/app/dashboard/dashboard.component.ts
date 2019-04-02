import { Component, OnInit } from '@angular/core';
import { AddProjectComponent } from '../projects/addProject-dialog/add-project-dialog.component';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { ProjectService } from './../services/project.service';

export interface Project {
  name: string;
  img: string;
}

export interface Application {
  name: string;
  img: string;
}

export interface OnInit {
  ngOnInit(): void;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  breakpoint: number;

  projectSearchQuery: string;
  applicationSearchQuery: string;
  projectName: string;

  showApplication: boolean = false;
  selectedItem: boolean = false;
  oldTarget: any;


  projects: Project[] = [];

  applications: Application[] = [
    { name: 'Application 1', img: 'application.svg' },
    { name: 'Application 2', img: 'application.svg' },
    { name: 'Application 3', img: 'application.svg' },
    { name: 'Application 4', img: 'application.svg' },
  ];


  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public projectService: ProjectService) {
    this.projectService.getProject().subscribe(pdata => {
      console.log(pdata);
      this.projects = pdata.data;
    });
  }


  ngOnInit() {
    // const element = window.innerWidth;
    const element = document.getElementById('projects').offsetWidth;
    this.responsiveGrid(element);


  }

  selectApplication(event, name) {
    this.showApplication = true;
    this.projectName = '';

    if (event.currentTarget.classList.contains('active')){
      event.currentTarget.classList.remove('active');
      this.showApplication = false;
    } else {

      if (this.oldTarget){
        this.oldTarget.classList.remove('active');
      }

      event.currentTarget.classList.add('active');
      this.projectName = name;
      this.oldTarget = event.currentTarget;
    }

    setTimeout(() => {
      const element = document.getElementById('projects').offsetWidth;
      this.responsiveGrid(element);
    }, 0);

  }

  onResize(event) {
    // const element = event.target.innerWidth;
    const element = document.getElementById('projects').offsetWidth;
    this.responsiveGrid(element);
  }

  responsiveGrid(element) {
    if (element >= 1024) {
      this.breakpoint = 6;
    } else if (element >= 768) {
      this.breakpoint = 4;
    } else if (element >= 500) {
      this.breakpoint = 3;
    } else if (element >= 300) {
      this.breakpoint = 2;
    }
  }

  openDialog(type, project): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '500px',
      disableClose: true,
      data: {
        type: type,
        project: project
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('no result');
      }
      if (result !== '' && result !== null && result.type === 'add') {
        this.projects.push(result.data.data);
        console.log(this.projects);
      }
      if (result !== '' && result !== null && result.type === 'edit') {
        console.log('edit dialog box after closed');
         console.log(result);
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i]['_id'] == result.data.pid ) {
            console.log('edit view');
            this.projects[i]['name'] = result.data.projectName;
          }
        }
        console.log(this.projects);
      }

      if (result !== '' && result !== null && result.type === 'delete') {
        console.log('delete dialog box after closed');
         console.log(result);
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i]['_id'] == result.data.pid ) {
            console.log('delete view');
            this.projects.splice(i, 1);
          }
        }
        console.log(this.projects);
      }

    });

  }

}
