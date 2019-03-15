import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dbfs',
  templateUrl: './DBFS.component.html',
  styleUrls: ['./DBFS.component.css']
})
export class DbfsComponent {
  allRoles: any;
  constructor() {

  }

  saveDbfs(form: NgForm) {
    console.log(form.value);
  }
}
