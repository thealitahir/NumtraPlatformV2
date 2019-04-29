import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MongodbService } from '../../../services/mongodb.service';
import { StageService } from '../../../services/stage.service';
import { DiscoverDataComponent } from '../discover-data-dialog/discover-data-dialog.component';
import { EditorComponent } from '../editor-dialog/editor-dialog.component';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-mongodb',
  templateUrl: './mongoDB.component.html',
  styleUrls: ['./mongoDB.component.css']
})
export class MongoDBComponent implements OnInit, OnChanges {
  @Input() stage_id: any ="5931acd3b33dca6c0bc3a456";
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
  stageSchema: any;
  stage_subtype: any = 'MongoDB';
  stagetype: any = 'source';
  error: any;
  dbdata: any;
  head: any;
  fhead: any;
  constructor(public snackBar: MatSnackBar, public mongodbService: MongodbService, public stageService: StageService, public dialog: MatDialog) {

  }

  ngOnInit(){
    this.stageService.getStageSchema("5931acd3b33dca6c0bc3a456").subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
      if(this.stage.stage_attributes.query) {
        this.addquery = true;
      }
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

  getSchemaAndSave(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
      this.error = '';
      this.openSnackBar('Info:', 'Save stage in process, Please wait!');
      this.data =  form.value;
      this.mongodbService.getDataSource(this.data).subscribe(data => {
        var fileheader = Object.keys(data[0]);
        var fh=[];
        for (let i = 0 ; fileheader.length > i; i++) {
          const head = {
            field : '',
            alias : '',
            position : 0,
            type : '',
       };
           head.field = fileheader[i];
           head.alias = fileheader[i];
           head.type = '';
           head.position = i + 1;
           fh.push(head);
           console.log(fh);
        }

        if (fh !== null) {
          this.fhead = fh;
           this.saveMongoDB(form);
        } else {
          this.openSnackBar('Error:', 'Error in getting schema, Please check, If source creds are correct and try again!');
        }
      });

  }

  saveMongoDB(form) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    console.log(this.fhead);
    console.log(this.stage.stage_attributes);
    //  this.data = {formdata: form.value, fileheader: this.fileheader};
     this.data = {updatedata: { 'name': this.stage.name, 'original_schema': this.fhead , 'selected_schema': this.fhead , 'stage_attributes': this.stage.stage_attributes },
     stage_id: this.stage_id};
     console.log(this.data);
     this.stageService.updateStage(this.data).subscribe(data => {
       console.log(data);
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }

    });
  }

  discoverData(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
      this.error = '';
      this.data = form.value;
      this.openSnackBar('SUCCESS:', 'Requested sample data.');
      this.mongodbService.getDataSource(this.data).subscribe(data => {
        console.log(data);
        this.dbdata = {filedata: data};
        this.openDialog(this.dbdata);
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

}
