import {Component, Inject} from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-dialog',
  templateUrl: 'application-dialog.component.html',
})
export class ApplicationComponent {
  appName: any ;
  appid: any;
  option: any;
  view: any = 0;
  parentId: any;
  appFile: any;
  selectedFile: any;
  uploadres: any;
  filePath: any;
  constructor(
    public appdialogRef: MatDialogRef<ApplicationComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public applicationService: ApplicationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (this.data.type === 'add') {
      this.parentId = this.data.application;
      } else {
        this.parentId = this.data.application._id;
        this.appName = this.data.application.name;
        this.appid = this.data.application._id;
        this.option = this.data.application.app_type;
      }
    }

  addApp(option) {
    this.option = option;
    this.view = 1;
  }

  backview() {
    this.view = 0;
  }

  createApplication(form: NgForm) {
    this.applicationService.createApp(form.value).subscribe(data => {
      if(data.status == true){
      this.appdialogRef.close({'type': 'add', 'data': data});
      this.openSnackBar('SUCCESS:', 'Project successfully creatred.');
      } else {
        this.openSnackBar('Failed:', 'Failed to create Project. Try Again!');
      }
    });
  }

  EditApplication(form: NgForm) {
    this.applicationService.editApp(form.value).subscribe(data => {
      if (data.data.nModified == 1 ) {
        this.openSnackBar('SUCCESS:', 'Project successfully updated.');
        this.appdialogRef.close({'type': 'edit', 'data': form.value});
      } else {
        this.openSnackBar('Failed:', 'Failed to update Project. Try Again!');
      }
    });
  }

  DeleteApplication(form: NgForm) {
    this.applicationService.deleteApp(this.data.application).subscribe(data => {
      this.openSnackBar('SUCCESS:', 'Project successfully deleted.');
      if (data.data.ok == 1) {
        this.appdialogRef.close({'type': 'delete', 'data': form.value});
      } else {
        this.openSnackBar('Failed:', 'Failed to delete Project. Try Again!');
      }
    });
  }

  onFileSelect(event) {
    console.log('upload file event ');
    this.selectedFile = event.target.files[0];
    this.applicationService.uploadDataFile(this.selectedFile).subscribe(uploadresponse => {
    this.uploadres = uploadresponse;
    this.filePath = this.uploadres.path + '/' + this.uploadres.uploadname;
    this.appFile = this.uploadres.uploadname;
    this.openSnackBar('Success:', 'File uploaded successfully!');
    // console.log('upload file ');
    // console.log(this.filePath);
    //  console.log(uploadresponse);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
