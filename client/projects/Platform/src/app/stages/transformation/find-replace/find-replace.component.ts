import { Component, OnInit } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';

@Component({
  selector: 'app-find-replace',
  templateUrl: './find-replace.component.html',
  styleUrls: ['./find-replace.component.css']
})
export class FindReplaceComponent {
  fileheader: any;
  data: any ;
  stage: any = {
    stage_attributes: {
      user_comment : '',
      replace_string : '',
      replace_option : '',
      find_string : '',
      find_option : '',
      output_fields : [],
      input_fields : []
    }
  };
  stagename: any = 'find_replace_transformation';
  stagetype: any = 'transformation';
  stageSchema: any;
  attributes: any = {};
  fileType: any;

  constructor(public snackBar: MatSnackBar, public stageService: StageService, public dialog: MatDialog) {
    this.stageService.getStageSchema(this.stagename, this.stagetype).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
      // console.log(this.stage.stage_attributes);
      // console.log(typeof(this.stage.stage_attributes));

    });
  }

  // setField(field){
  //   this.stage.stage_attributes.input_fields = [];
  //   const selected_field = _.where($scope.fields,{field:field})[0];
  //   if(selected_field)
  //       $scope.stage.stage_attributes.input_fields.push(selected_field);
  // }
  selectFieldType(field) {
    this.stage.stage_attributes.input_fields = [];
    this.stage.stage_attributes.input_fields.push(field);
    console.log(this.stage.stage_attributes.input_fields);
  }

  saveFindReplace(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }

    this.stage.stage_attributes.output_fields = [];
    this.stage.stage_attributes.output_fields.push(this.stage.stage_attributes.input_fields[0]);
    this.data = {updatedata: {'stage_attributes': this.stage.stage_attributes}, stageName: this.stagename};
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
