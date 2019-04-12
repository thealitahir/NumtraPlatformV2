import {Component, Inject, forwardRef} from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'brace';
import 'brace/mode/sql';
import 'brace/theme/github';
import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';

@Component({
  selector: 'app-editor-dialog',
  templateUrl: 'editor-dialog.component.html',
  styleUrls: ['editor-dialog.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ]
})
//export class EditorComponent  implements ControlValueAccessor {
export class EditorComponent {
  public config: AceConfigInterface = {
    mode: 'sql',
    theme: 'github',
    readOnly : false
  };
  querytext: any;
  constructor(
    public dialogRef: MatDialogRef<EditorComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.querytext = data.querytext;
    }

    // writeValue(value: any) {
    //   if (value !== undefined) {
    //     this.querytext = value;
    //   }
    // }
    // propagateChange = (_: any) => {};
    // registerOnChange(fn) {
    //   this.propagateChange = fn;
    // }

    // registerOnTouched() {}

addQuery(form: NgForm) {
  const data = this.querytext;
  this.dialogRef.close({ 'data': data});
}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
