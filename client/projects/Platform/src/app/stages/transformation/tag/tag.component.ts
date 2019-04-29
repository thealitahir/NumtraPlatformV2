import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../../../services/stage.service';

import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnChanges {
  @Input() stage_id: any ="5889b67d5b92022375a39c0b";
  fileheader: any;
  addquery: any = false;
  data: any ;
  stage: any = {
    name: '',
    original_schema: [],
    stage_attributes: {
      username: '',
      password: '',
      hostaddress: '',
      port: '',
      database: '',
      collection: '',
      query: '',
    }
  };
  fileExplorer:any;
  fileExplorerView:any = 0;
  stageSchema: any;
  stage_subtype: any = 'Tag';
  stagetype: any = 'sink';
  error: any;
  dbdata: any;
  head: any;
  fhead: any;
  constructor(public snackBar: MatSnackBar, public stageService: StageService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.stageService.getStageSchema("5889b67d5b92022375a39c0b").subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
    });
  }

  ngOnChanges(changes: any) {
    // for (let propName in changes) {
    //   // only run when property "task" changed
    //   if (propName === 'stage_id') {
    //     console.log("stage Id : " + this.stage_id);
    //     if (this.stage_id) {
    //       this.stageService.getStageSchema(this.stage_id).subscribe(schemadata => {
    //         this.stage = schemadata.data;
    //         this.stageSchema = schemadata.data.original_schema;
    //       });
    //     }
    //   }
    // }
  }


  saveTag(form) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
     this.data = {updatedata: { 'name': this.stage.name, 'stage_attributes': this.stage.stage_attributes },
     stage_id: this.stage_id};
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
