import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CosmosdbService } from '../../../services/cosmosdb.service';
import { StageService } from '../../../services/stage.service';
import { DiscoverDataComponent } from '../discover-data-dialog/discover-data-dialog.component';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-cosmosdb',
  templateUrl: './cosmosDB.component.html',
  styleUrls: ['./cosmosDB.component.css']
})
export class CosmosDBComponent implements OnInit{
  fileheader: any;
  data: any ;
  stage: any = {
    original_schema: [],
    stage_attributes: {
      container_id: '',
      db_id: '',
      query: '',
      cosmosdb_key: '',
      cosmosdb_domain: ''
    }
  };
  fileExplorer:any;
  fileExplorerView:any = 0;
  stageSchema: any;
  stagename: any = 'Cosmos DB';
  stagetype: any = 'source';
  error: any;
  dbdata: any;
  head: any;
  fhead: any;
  constructor(public snackBar: MatSnackBar, public cosmosdbService: CosmosdbService, public stageService: StageService, public dialog: MatDialog) {
    this.stageService.getStageSchema(this.stagename,this.stagetype).subscribe(schemadata => {
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;

    });
  }

  ngOnInit(){}

  getSchemahenSave(form: NgForm) {
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
     this.data = {formdata: form.value, fileheader: this.fileheader};
     this.data = {updatedata: { 'original_schema': this.fhead, 'stage_attributes.cosmosdb_domain': form.value.cosmosdomain,
     'stage_attributes.container_id': form.value.containerid, 'stage_attributes.db_id':  form.value.dbid,
     'stage_attributes.cosmosdb_key': form.value.cosmoskey, 'stage_attributes.query':  form.value.cosmosquery },
     stageName: this.stagename};
     this.stageService.updateStage(this.data).subscribe(data => {
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }

    });
  }

  discoverData(form: NgForm) {
    if (form.value.url !== '' && form.value.dbfstoken !== '' && form.value.dbfsdomain !== '' ) {
      this.error = '';
      this.data = {query: form.value.cosmosquery, key: form.value.cosmoskey , domain: form.value.cosmosdomain, db: form.value.dbid, container: form.value.containerid };
      this.openSnackBar('SUCCESS:', 'Requested sample data.');
      this.cosmosdbService.getDataSource(this.data).subscribe(data => {
        this.dbdata = {filedata: data};
        this.openDialog(this.dbdata);
        this.fileheader = data.fileheader;
      });
    }

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

}
