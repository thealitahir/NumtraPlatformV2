import { Component, OnInit } from '@angular/core';

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


  projects: Project[] = [
    { name: 'Project 1', img: 'project.svg' },
    { name: 'Project 2', img: 'project.svg' },
    { name: 'Project 3', img: 'project.svg' },
    { name: 'Project 4', img: 'project.svg' },
    { name: 'Project 5', img: 'project.svg' },
    { name: 'Project 6', img: 'project.svg' },
    { name: 'Project 7', img: 'project.svg' },
    { name: 'Project 8', img: 'project.svg' },
    { name: 'Project 9', img: 'project.svg' },
    { name: 'Project 10', img: 'project.svg' },
    { name: 'Project 11', img: 'project.svg' },
  ];

  applications: Application[] = [
    { name: 'Application 1', img: 'application.svg' },
    { name: 'Application 2', img: 'application.svg' },
    { name: 'Application 3', img: 'application.svg' },
    { name: 'Application 4', img: 'application.svg' },
  ];





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

}
