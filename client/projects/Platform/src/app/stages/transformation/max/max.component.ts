import { Component, OnInit } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
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
  stage: any = {
    stage_attributes: {
      parameter: ''
    }
  };
  stagename: any = 'Top';
  stageSchema: any;
  attributes: any = {};

  constructor(public dbfsService: DbfsService, public stageService: StageService, public dialog: MatDialog) {
    this.stage.stage_attributes.parameters = '';
    this.stageService.getStageSchema(this.stagename).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
      console.log(this.stage.stage_attributes.parameter);
      console.log(typeof(this.stage.stage_attributes.parameter));

    });
  }

  selectFieldType(fieldType) {
    this.attributes = {topResults: '' , dataType: fieldType.type , field: fieldType.field };
  }

  saveTop(form: NgForm) {
    // console.log(form.value);
    this.attributes.topResults = form.value.results;
    console.log(this.attributes);
    this.data = {updatedata: {'stage_attributes.attributes': this.attributes}, stageName: 'Top'};
    this.stageService.updateStage(this.data).subscribe(data => {
      console.log(data);
    });
  }

}
