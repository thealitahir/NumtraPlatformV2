import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbfsService } from '../../../services/dbfs.service';
import { StageService } from '../../../services/stage.service';
import { DiscoverDataComponent } from '../discover-data-dialog/discover-data-dialog.component';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';

@Component({
  selector: 'app-dbfs',
  templateUrl: './DBFS.component.html',
  styleUrls: ['./DBFS.component.css']
})
export class DbfsComponent {
  fileheader: any;
  data: any ;
  constructor(public dbfsService: DbfsService, public stageService: StageService, public dialog: MatDialog) {

  }

  saveDbfs(form: NgForm) {
    this.data = {formdata: form.value, fileheader: this.fileheader};
    console.log(this.data);
    this.stageService.updateStage(this.data).subscribe(data => {
      console.log(data);
    });
  }

  discoverData() {
    this.dbfsService.getDataSource().subscribe(data => {
      console.log(data);
      this.openDialog(data);
      this.fileheader = data.fileheader;
    });
  }

  openDialog(sampledata): void {
    const dialogRef = this.dialog.open(DiscoverDataComponent, {
      width: '900px',
      disableClose: true,
      data: {
        sampleData: sampledata,
      }
    });
  }
}
