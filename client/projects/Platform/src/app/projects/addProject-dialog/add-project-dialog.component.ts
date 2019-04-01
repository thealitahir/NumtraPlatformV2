import {Component, Inject} from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: 'add-project-dialog.component.html',
})
export class AddProjectComponent {
  projectName: any ;
  pid: any;
  constructor(
    public dialogRef: MatDialogRef<AddProjectComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    public projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (this.data.type !== 'add') {
        this.projectName = this.data.project.name;
        this.pid = this.data.project._id;
      }
    }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createProject(form: NgForm) {
    this.projectService.createProject(form.value).subscribe(data => {
      if(data.status == true){
      this.dialogRef.close({'type': 'add', 'data': data});
      this.openSnackBar('SUCCESS:', 'Project successfully creatred.');
      } else {
        this.openSnackBar('Failed:', 'Failed to create Project. Try Again!');
      }
    });
  }

  EditProject(form: NgForm) {
    console.log(form.value);
    this.projectService.editProject(form.value).subscribe(data => {
      if (data.data.nModified == 1 ) {
        this.openSnackBar('SUCCESS:', 'Project successfully updated.');
        console.log(typeof(data.data.nModified));
        this.dialogRef.close({'type': 'edit', 'data': form.value});
      } else {
        this.openSnackBar('Failed:', 'Failed to update Project. Try Again!');
      }
    });
  }

  DeleteProject(form: NgForm) {
    this.projectService.deleteProject(form.value).subscribe(data => {
      this.openSnackBar('SUCCESS:', 'Project successfully deleted.');
      if (data.data.ok == 1) {
        this.dialogRef.close({'type': 'delete', 'data': form.value});
      } else {
        this.openSnackBar('Failed:', 'Failed to delete Project. Try Again!');
      }
    });
  }

}
