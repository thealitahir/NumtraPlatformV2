import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dbfs-sink',
  templateUrl: './dbfs-sink.component.html',
  styleUrls: ['./dbfs-sink.component.css']
})
export class DbfsSinkComponent implements OnInit {
  data: any ;
  stage: any = {
    name: '',
    stage_attributes: {
      url: '',
      delimiter: '',
      file_type: ''
    }
  };
  stage_subtype: any = 'DBFS';
  stageType: any = 'sink';
  constructor(public stageService: StageService, public snackBar: MatSnackBar) {
    this.stageService.getStageSchema(this.stage_subtype, this.stageType).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;

    });
   }

  ngOnInit() {
  }

  saveSinkDbfs(form: NgForm) {
    this.data = {formdata: form.value};
    console.log(this.data);
    this.data = {updatedata: { 'name': this.stage.name, 'stage_attributes.url': form.value.url, 'stage_attributes.delimiter': form.value.fileDelimeter,
    'stage_attributes.file_type':  form.value.fileType, 'stage_attributes.dbfs_token': form.value.dbfstoken,
    'stage_attributes.dbfs_domain':  form.value.dbfsdomain }, sub_type: this.stage_subtype, stage_type: this.stageType};

    this.stageService.updateStage(this.data).subscribe(data => {
      console.log(data);
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
