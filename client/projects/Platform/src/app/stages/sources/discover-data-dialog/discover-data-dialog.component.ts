import {Component, Inject} from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-discover-data-dialog',
  templateUrl: 'discover-data-dialog.component.html',
  styleUrls: ['discover-data-dialog.component.css']
})
export class DiscoverDataComponent {

  constructor(
    public dialogRef: MatDialogRef<DiscoverDataComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
