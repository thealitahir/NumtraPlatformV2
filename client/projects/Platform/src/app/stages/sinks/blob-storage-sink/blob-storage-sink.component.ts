import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlobService } from '../../../services/blob.service';
import { StageService } from '../../../services/stage.service';
import { DiscoverDataComponent } from '../../sources/discover-data-dialog/discover-data-dialog.component';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';

@Component({
  selector: 'app-blob-storage-sink',
  templateUrl: './blob-storage-sink.component.html',
  styleUrls: ['./blob-storage-sink.component.css']
})
export class BlobStorageSinkComponent implements OnInit{
  fileheader: any;
  data: any ;
  stage: any = {
    name: '',
    original_schema: [],
    stage_attributes: {
      accountname: '',
      accountkey: '',
      containername: '',
      blobname: '',
      url: '',
      delimiter: '',
      file_type: '',
      is_header: 'Use Header Line'
    }
  };
  containerslist: any;
  blobslist: any;
  stageSchema: any;
  stage_subtype: any = 'BlobStorage';
  stagetype: any = 'sink';
  error: any;
  constructor(public snackBar: MatSnackBar, public blobService: BlobService, public stageService: StageService, public dialog: MatDialog) {
    this.stageService.getStageSchema(this.stage_subtype, this.stagetype).subscribe(schemadata => {
      console.log(schemadata.data);
      this.stage = schemadata.data;

      if(this.stage.stage_attributes.accountname !== '' && this.stage.stage_attributes.accountkey !== '' ){
        this.getContainers();
      }

      if(this.stage.stage_attributes.accountname !== '' && this.stage.stage_attributes.accountkey !== '' && this.stage.stage_attributes.containername !== '' ){
        this.getBlobs();
      }

    });
  }

  ngOnInit() {}

  getSchemaandSave(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    if (form.value.accountname !== '' && form.value.accountkey !== '' && form.value.containername !== '' && form.value.blobname !== '' ) {
      this.error = '';
      this.openSnackBar('Info:', 'Save stage in process, Please wait!');
      this.data = {accountName: form.value.accountname, accountKey: form.value.accountkey, container: form.value.containername, blob: form.value.blobname  };
      this.blobService.getBlob(this.data).subscribe(data => {
        console.log(data);
        this.fileheader = data.fileheader;

        if (data.fileheader !== null) {
           this.saveBlob(form);
        } else {
          this.openSnackBar('Error:', 'Error in getting schema, Please check the, If source creds are correct and try again!');
        }
      });
    }
  }

  saveBlob(form) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }

    this.data = {updatedata: { 'name': this.stage.name, 'original_schema': this.fileheader, 'stage_attributes.url': form.value.url,
     'stage_attributes.delimiter': form.value.fileDelimeter, 'stage_attributes.file_type':  form.value.fileType,
     'stage_attributes.accountname': form.value.accountname, 'stage_attributes.accountkey':  form.value.accountkey,
     'stage_attributes.is_header': 'Use Header Line', 'stage_attributes.containername': form.value.containername,
     'stage_attributes.blobname': form.value.blobname },
     sub_type: this.stage_subtype, stage_type: this.stagetype};
     console.log(this.data);
    this.stageService.updateStage(this.data).subscribe(data => {
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }
    });
  }

  getContainers() {
    if (this.stage.stage_attributes.accountname !== '' && this.stage.stage_attributes.accountkey !== '' ) {
      this.error = '';
      this.data = {accountName: this.stage.stage_attributes.accountname, accountKey: this.stage.stage_attributes.accountkey };
      this.openSnackBar('SUCCESS:', 'Rrequested sample data.');
      this.blobService.getContainers(this.data).subscribe(data => {
        console.log(data);
        this.containerslist = data[0].Container;
      });
    }
  }

  getBlobs() {
    if (this.stage.stage_attributes.accountname !== '' && this.stage.stage_attributes.accountkey !== '' && this.stage.stage_attributes.containername !== '' ) {
      this.error = '';
      this.data = {accountName: this.stage.stage_attributes.accountname, accountKey: this.stage.stage_attributes.accountkey, container: this.stage.stage_attributes.containername };
      this.openSnackBar('SUCCESS:', 'Rrequested sample data.');
      this.blobService.getBlobsList(this.data).subscribe(data => {
        console.log(data);
        this.blobslist = data[0].Blob;
        this.stage.stage_attributes.url = this.stage.stage_attributes.accountname + '/' + this.stage.stage_attributes.containername;
      });
    }
  }

  selectBlob(form: NgForm) {
    if (form.value.accountname !== '' && form.value.accountkey !== '' && form.value.containername !== '' && form.value.blobname !== '' ) {
      this.stage.stage_attributes.url = form.value.accountname + '/' + form.value.containername + '/' + form.value.blobname;
    }
  }

  discoverData(form: NgForm) {
    if (form.value.accountname !== '' && form.value.accountkey !== '' && form.value.containername !== '' && form.value.blobname !== '' ) {
      this.error = '';
      this.data = {accountName: form.value.accountname, accountKey: form.value.accountkey, container: form.value.containername, blob: form.value.blobname  };
      this.openSnackBar('SUCCESS:', 'Rrequested sample data.');
      this.blobService.getBlob(this.data).subscribe(data => {
        console.log(data);
        this.openDialog(data);
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