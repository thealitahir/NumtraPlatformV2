import { Component, OnInit } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar , MatDialog } from '@angular/material';

@Component({
  selector: 'app-min',
  templateUrl: './min.component.html',
  styleUrls: ['./min.component.css']
})
export class MinComponent {
  fileheader: any;
  data: any ;
  stage: any = {
    name: '',
    stage_attributes: {
      parameter: '',
      attributes: {topResults: '' , dataType: '' , field: '' }
    }
  };

  stage_subtype: any = 'Bottom';
  stagetype: any = 'transformation';
  stageSchema: any;
  attributes: any = {};
  fileType: any;

  constructor(public snackBar: MatSnackBar, public stageService: StageService, public dialog: MatDialog) {
    this.stageService.getStageSchema(this.stage_subtype, this.stagetype).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
      // console.log(this.stage.stage_attributes.parameter);
      // console.log(typeof(this.stage.stage_attributes.parameter));

    });
  }

  selectFieldType(fieldType) {
    this.stage.stage_attributes.attributes = {topResults: '' , dataType: fieldType.type , field: fieldType.field };
  }

  saveBottom(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    this.attributes.topResults = form.value.results;
    this.data = {updatedata: {'name':this.stage.name, 'stage_attributes.attributes': this.stage.stage_attributes.attributes}, sub_type: this.stage_subtype, stage_type: this.stagetype};
    this.stageService.updateStage(this.data).subscribe(data => {
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
