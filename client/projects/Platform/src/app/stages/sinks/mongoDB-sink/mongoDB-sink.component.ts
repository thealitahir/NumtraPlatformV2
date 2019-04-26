import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MongodbService } from '../../../services/mongodb.service';
import { StageService } from '../../../services/stage.service';

import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-mongodb-sink',
  templateUrl: './mongoDB-sink.component.html',
  styleUrls: ['./mongoDB-sink.component.css']
})
export class MongoDBSinkComponent implements OnInit, OnChanges {
  @Input() stage_id: any ="5a31312d18e429f37b7d925e";
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
  stage_subtype: any = 'MongoDB';
  stagetype: any = 'sink';
  error: any;
  dbdata: any;
  head: any;
  fhead: any;
  constructor(public snackBar: MatSnackBar, public mongodbService: MongodbService, public stageService: StageService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.stageService.getStageSchema("5a31312d18e429f37b7d925e").subscribe(schemadata => {
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


  saveMongoDBSink(form) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
     this.data = {formdata: form.value, fileheader: this.fileheader};
     this.data = {updatedata: { 'name': this.stage.name, 'stage_attributes.Endpoint': form.value.cosmosdomain,
     'stage_attributes.Collection': form.value.containerid, 'stage_attributes.Database':  form.value.dbid,
     'stage_attributes.Masterkey': form.value.cosmoskey, 'stage_attributes.query':  form.value.cosmosquery },
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
