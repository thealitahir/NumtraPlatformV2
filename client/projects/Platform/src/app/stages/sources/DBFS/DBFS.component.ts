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
export class DbfsComponent implements OnInit{
  fileheader: any;
  data: any ;
  constructor(public dbfsService: DbfsService, public stageService: StageService, public dialog: MatDialog) {

  }

  ngOnInit(){

  }

  saveDbfs(form: NgForm) {
    this.data = {formdata: form.value, fileheader: this.fileheader};
    console.log(this.data);
    this.data = {updatedata: { 'original_schema': this.fileheader, 'stage_attributes.url': form.value.url,
     'stage_attributes.source_delimeter': form.value.filedelimeter, 'stage_attributes.file_type':  form.value.filetype },
     stageName: 'DBFS'};

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
