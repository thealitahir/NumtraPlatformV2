import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbfsService } from '../../../services/dbfs.service';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';

@Component({
  selector: 'app-max',
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.css']
})
export class MaxComponent {
  fileheader: any;
  data: any ;
  stage: any;
  stagename: any = 'Top';
  stageSchema: any;

  constructor(public dbfsService: DbfsService, public stageService: StageService, public dialog: MatDialog) {
    // this.stage.stage_attributes = '';
    this.stageService.getStageSchema(this.stagename).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
    });
  }

  saveTop(form: NgForm) {
    console.log(form.value);
  }


}
