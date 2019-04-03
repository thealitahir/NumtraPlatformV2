import {Component, Inject} from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-read-dialog',
  templateUrl: 'fileRead-dialog.component.html',
  styleUrls: ['fileRead-dialog.component.css']
})
export class FileReadComponent {
  fileName: any ;
  fileData: any;
  constructor(
    public dialogRef: MatDialogRef<FileReadComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fileName = this.data.filename;
      this.fileData = this.data.fdata.filedata;
    }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
