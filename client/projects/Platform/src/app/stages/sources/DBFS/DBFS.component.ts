import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbfsService } from '../../../services/dbfs.service';

@Component({
  selector: 'app-dbfs',
  templateUrl: './DBFS.component.html',
  styleUrls: ['./DBFS.component.css']
})
export class DbfsComponent {
  allRoles: any;
  constructor(public dbfsService: DbfsService) {

  }

  saveDbfs(form: NgForm) {
    console.log(form.value);
  }

  discoverData() {
    this.dbfsService.getDataSource().subscribe(data => {
      console.log(data);
    });
  }
}
