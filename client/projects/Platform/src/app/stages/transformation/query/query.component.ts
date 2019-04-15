import { Component, OnInit } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar , MatDialog } from '@angular/material';
import { EditorComponent } from '../../sources/editor-dialog/editor-dialog.component';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit{
  data: any ;
  stage: any = {
    stage_attributes: {
      query: '',
    }
  };
  stageSchema: any;
  stage_subtype: any = 'Query';
  stagetype: any = 'transformation';

  constructor(public snackBar: MatSnackBar, public stageService: StageService, public dialog: MatDialog) {
    this.stageService.getStageSchema(this.stage_subtype, this.stagetype).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;

    });
  }

  ngOnInit() {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  expandEditor() {
    const dialogRef = this.dialog.open(EditorComponent, {
      width: '900px',
      disableClose: true,
      data: {
        querytext: this.stage.stage_attributes.query,
      }
    });
    dialogRef.afterClosed().subscribe(qresult => {
      if (!qresult) {
        console.log('no result');
      }
      if (qresult !== '' && qresult !== null ) {
        this.stage.stage_attributes.query = qresult.data;
      }
    });
  }

  saveQuery(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    this.data = {updatedata: {'name': this.stage.name, 'stage_attributes': this.stage.stage_attributes}, sub_type: this.stage_subtype, stage_type: this.stagetype};
    this.stageService.updateStage(this.data).subscribe(data => {
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }
    });
  }

}
