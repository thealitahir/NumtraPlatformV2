import {Component, Inject} from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-feature-graph-dialog',
  templateUrl: 'feature-graph-dialog.component.html',
})
export class FeatureGraphDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<FeatureGraphDialogComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    // fileType: any;
    // delimeter: any;
     error: any = '';
    view: any[] = [700, 350];
  showXAxis = true;
  xAxisTicks = [1, 100];
  colorScheme = {
    domain: ['#3f51b5']
  };

  //   save(): void {
  //     if ( this.fileType === '' || this.delimeter === '' ||  this.fileType == null || this.delimeter == null) {
  //       this.error = 'Please fill all the Fields';
  //       this.openSnackBar('ERROR:', 'Please fill all the Fields');
  //    } else {
  //   this.dialogRef.close({'fileType': this.fileType, 'delimeter': this.delimeter});
  //    }
  // }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
