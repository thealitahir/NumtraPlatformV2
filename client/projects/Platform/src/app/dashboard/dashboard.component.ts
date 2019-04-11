import { Component, OnInit } from '@angular/core';
import { AddProjectComponent } from '../projects/addProject-dialog/add-project-dialog.component';
import { ApplicationComponent } from '../projects/application-dialog/application-dialog.component';
import { FileReadComponent } from '../projects/fileRead-dialog/fileRead-dialog.component';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { ProjectService } from './../services/project.service';
import { ApplicationService } from './../services/application.service';
import { NumberCardModule } from '@swimlane/ngx-charts';

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
  projectId: any;
  parentId: any;
  parentName: any;
  showApplication: boolean = false;
  selectedItem: boolean = false;
  oldTarget: any;
  hideback: any = 1;
  parent: any;
  data: any;
  parentStack: any = [];
  projects: Project[] = [];
  stackobj: any;
  applications: Application[] = [];


  constructor(public snackBar: MatSnackBar, public dialog: MatDialog,public applicationService: ApplicationService, public projectService: ProjectService) {
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

  selectApplication(event, data , type) {
    this.showApplication = true;
    this.parentId = '';
    if (type === 'project') {
      this.parentStack = [];
      this.projectId = data._id;
      this.projectName = data.name;
      this.hideback = 1;
      this.stackobj = {parentId : data._id, parentName : data.name, type: 'project'};
      this.parentStack.push(this.stackobj);
    }
    if (type === 'application') {
      this.hideback = 0;
      this.stackobj = {parentId : data._id, parentName : data.name, type: 'application'};
      this.parentStack.push(this.stackobj);
    }

    if (event.currentTarget.classList.contains('active')){
      event.currentTarget.classList.remove('active');
      this.showApplication = false;
    } else {

      if (this.oldTarget){
        this.oldTarget.classList.remove('active');
      }

      event.currentTarget.classList.add('active');
      this.parentName = data.name;
      this.parentId = data._id;
      this.oldTarget = event.currentTarget;
    }

    this.applicationService.getApplications(this.parentId).subscribe(adata => {

      this.applications = adata.data;


    });

    setTimeout(() => {
      const element = document.getElementById('projects').offsetWidth;
      this.responsiveGrid(element);
    }, 0);

  }

  previous() {
    this.parentStack.pop();
    const index = this.parentStack.length - 1;
    const parID = this.parentStack[index];
    this.applicationService.getPreviousApplications(parID.parentId).subscribe(adata => {

      this.applications = adata.data;
      this.parent = parID;

      this.parentId = this.parent.parentId;
      this.parentName =  this.parent.parentName;
      if (this.parent.type !== 'application') {
        this.hideback = 1;
      }
    });
  }

  readFile(appdata) {
  this.data = {path: appdata.file.path };
    this.applicationService.readAppFile(this.data).subscribe(adata => {
     this.openReadDialog(adata, appdata.name);
    });
  }

  onResize(event) {
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
  openAppDialog(type, application): void {
    const appdialogRef = this.dialog.open(ApplicationComponent, {
      width: '500px',
      disableClose: true,
      data: {
        type: type,
        application: application
      }
    });
    appdialogRef.afterClosed().subscribe(result => {
      if (!result) {
        console.log('no result');
      }
      if (result !== '' && result !== null && result.type === 'add') {
        this.applications.push(result.data.data);
      }

      if (result !== '' && result !== null && result.type === 'edit') {
        for (let i = 0; i < this.applications.length; i++) {
          if (this.applications[i]['_id'] == result.data.appid ) {
            this.applications[i]['name'] = result.data.appName;
          }
        }
      }

      if (result !== '' && result !== null && result.type === 'delete') {
        for (let i = 0; i < this.applications.length; i++) {
          if (this.applications[i]['_id'] == result.data.appid ) {
            this.applications.splice(i, 1);
          }
        }
       // console.log(this.applications);
      }
    });
  }

  openReadDialog(filedata , name ): void {
    const dialogRef = this.dialog.open(FileReadComponent, {
      width: '900px',
      disableClose: true,
      data: {
        fdata: filedata,
        filename: name
      }
    });
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
      }
      if (result !== '' && result !== null && result.type === 'edit') {
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i]['_id'] == result.data.pid ) {
            this.projects[i]['name'] = result.data.projectName;
          }
        }
        console.log(this.projects);
      }

      if (result !== '' && result !== null && result.type === 'delete') {
        for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i]['_id'] == result.data.pid ) {
            this.projects.splice(i, 1);
          }
        }
        console.log(this.projects);
      }

    });

  }

}
