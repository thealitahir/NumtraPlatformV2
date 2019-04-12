import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbfsService } from '../../../services/dbfs.service';
import { StageService } from '../../../services/stage.service';
import { DiscoverDataComponent } from '../discover-data-dialog/discover-data-dialog.component';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-dbfs',
  templateUrl: './DBFS.component.html',
  styleUrls: ['./DBFS.component.css']
})
export class DbfsComponent implements OnInit{
  fileheader: any;
  data: any ;
  stage: any = {
    original_schema: [],
    stage_attributes: {
      url: '',
      source_delimeter: '',
      file_type: '',
      dbfs_token: '',
      dbfs_domain: ''
    }
  };
  fileExplorer:any;
  fileExplorerView:any = 0;
  stageSchema: any;
  stagename: any = 'DBFS';
  stagetype: any = 'source';
  fileExplorerSource:any;
  error: any;
  constructor(public snackBar: MatSnackBar, public dbfsService: DbfsService, public stageService: StageService, public dialog: MatDialog) {
    this.stageService.getStageSchema(this.stagename,this.stagetype).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;

    });
  }

  ngOnInit(){
  }
  
  getSchemahenSave(form: NgForm) {
    if (form.value.url !== '' && form.value.dbfstoken !== '' && form.value.dbfsdomain !== '' ) {
      this.error = '';
      this.openSnackBar('Info:', 'Save stage in process, Please wait!');
      this.data = {path: form.value.url, token: form.value.dbfstoken , domain: form.value.dbfsdomain};
      this.dbfsService.getDataSource(this.data).subscribe(data => {
        console.log(data);
        this.fileheader = data.fileheader;
        if (data.fileheader !== null) {
           this.saveDbfs(form);
        } else {
          this.openSnackBar('Error:', 'Error in getting schema, Please check the, If source creds are correct and try again!');
        }
      });

      
    }
  }

  saveDbfs(form) {


   // this.data = {formdata: form.value, fileheader: this.fileheader};
     console.log('form value');
     console.log(form.value);
    this.data = {updatedata: { 'original_schema': this.fileheader, 'stage_attributes.url': form.value.url,
     'stage_attributes.source_delimeter': form.value.fileDelimeter, 'stage_attributes.file_type':  form.value.fileType,
     'stage_attributes.dbfs_token': form.value.dbfstoken, 'stage_attributes.dbfs_domain':  form.value.dbfsdomain },
     stageName: 'DBFS'};
     console.log(this.data);
    this.stageService.updateStage(this.data).subscribe(data => {
      // console.log(data);
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
      this.data = {path: form.value.url, token: form.value.dbfstoken , domain: form.value.dbfsdomain };
      this.openSnackBar('SUCCESS:', 'Rrequested sample data.');
      this.dbfsService.getDataSource(this.data).subscribe(data => {
        console.log(data);
        this.openDialog(data);
        this.fileheader = data.fileheader;
      });
      
    }

  }
  chooseFile(form: NgForm){
    if (form.value.dbfstoken !== '' && form.value.dbfsdomain !== '' ) {
      this.fileExplorer = [{token: form.value.dbfstoken , domain: form.value.dbfsdomain}];
      this.fileExplorerView = 1;      
    }
  }
  getSelectedFiles(event){
    this.fileExplorerSource = event;
    this.fileExplorerView = 0;
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
