import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CosmosdbService } from '../../../services/cosmosdb.service';
import { StageService } from '../../../services/stage.service';
import { EditorComponent } from '../../sources/editor-dialog/editor-dialog.component';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-cosmosdb-sink',
  templateUrl: './cosmosDB-sink.component.html',
  styleUrls: ['./cosmosDB-sink.component.css']
})
export class CosmosDBSinkComponent implements OnInit{
  fileheader: any;
  data: any ;
  stage: any = {
    name: '',
    original_schema: [],
    stage_attributes: {
      Collection: '',
      Database: '',
      query: '',
      Masterkey: '',
      Endpoint: ''
    }
  };
  fileExplorer:any;
  fileExplorerView:any = 0;
  stageSchema: any;
  stage_subtype: any = 'CosmosDB';
  stagetype: any = 'sink';
  error: any;
  dbdata: any;
  head: any;
  fhead: any;
  constructor(public snackBar: MatSnackBar, public cosmosdbService: CosmosdbService, public stageService: StageService, public dialog: MatDialog) {
    this.stageService.getStageSchema(this.stage_subtype, this.stagetype).subscribe(schemadata => {
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;

    });
  }

  ngOnInit(){}

  getSchemahenSave(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    if (form.value.cosmosdomain !== '' && form.value.cosmoskey !== '' && form.value.query !== '' ) {
      this.error = '';
      this.openSnackBar('Info:', 'Save stage in process, Please wait!');
      this.data = {query: form.value.cosmosquery, key: form.value.cosmoskey , domain: form.value.cosmosdomain, db: form.value.dbid, container: form.value.containerid };
      this.cosmosdbService.getDataSource(this.data).subscribe(data => {
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
        }

        if (fh !== null) {
          this.fhead = fh;
           this.saveDbfs(form);
        } else {
          this.openSnackBar('Error:', 'Error in getting schema, Please check, If source creds are correct and try again!');
        }
      });
    }
  }

  saveDbfs(form) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
     this.data = {formdata: form.value, fileheader: this.fileheader};
     this.data = {updatedata: { 'name': this.stage.name, 'original_schema': this.fhead, 'stage_attributes.Endpoint': form.value.cosmosdomain,
     'stage_attributes.Collection': form.value.containerid, 'stage_attributes.Database':  form.value.dbid,
     'stage_attributes.Masterkey': form.value.cosmoskey, 'stage_attributes.query':  form.value.cosmosquery, 'stage_attributes.upsert': true },
     sub_type: this.stage_subtype, stage_type: this.stagetype};
     this.stageService.updateStage(this.data).subscribe(data => {
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }

    });
  }

  // discoverData(form: NgForm) {
  //   if (form.value.url !== '' && form.value.dbfstoken !== '' && form.value.dbfsdomain !== '' ) {
  //     this.error = '';
  //     this.data = {query: form.value.cosmosquery, key: form.value.cosmoskey , domain: form.value.cosmosdomain, db: form.value.dbid, container: form.value.containerid };
  //     this.openSnackBar('SUCCESS:', 'Requested sample data.');
  //     this.cosmosdbService.getDataSource(this.data).subscribe(data => {
  //       this.dbdata = {filedata: data};
  //       this.openDialog(this.dbdata);
  //       this.fileheader = data.fileheader;
  //     });
  //   }

  // }

  // openDialog(sampledata): void {
  //   const dialogRef = this.dialog.open(DiscoverDataComponent, {
  //     width: '900px',
  //     disableClose: true,
  //     data: {
  //       sampleData: sampledata,
  //     }
  //   });
  // }

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
