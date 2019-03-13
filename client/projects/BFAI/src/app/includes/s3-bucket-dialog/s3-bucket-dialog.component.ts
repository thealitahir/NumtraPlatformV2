import {Component, Inject} from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-s3-bucket-dialog',
  templateUrl: 's3-bucket-dialog.component.html',
})
export class S3BucketDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<S3BucketDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    fileType: any;
    delimeter: any;
    error: any = '';


    save(): void {
      if ( this.fileType === '' || this.delimeter === '' ||  this.fileType == null || this.delimeter == null) {
        this.error = 'Please fill all the Fields';
        this.openSnackBar('ERROR:', 'Please fill all the Fields');
     } else {
    this.dialogRef.close({'fileType': this.fileType, 'delimeter': this.delimeter});
     }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
