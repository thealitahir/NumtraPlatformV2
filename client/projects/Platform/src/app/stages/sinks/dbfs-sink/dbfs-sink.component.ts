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
    stage_attributes: {
      url: '',
      source_delimeter: '',
      file_type: ''
    }
  };
  stageName: any = 'dbfs_sink';
  constructor(public stageService: StageService, public snackBar: MatSnackBar) {
    this.stageService.getStageSchema(this.stageName).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;

    });
   }

  ngOnInit() {
  }

  saveSinkDbfs(form: NgForm) {
    this.data = {formdata: form.value};
    console.log(this.data);
    this.data = {updatedata: { 'stage_attributes.url': form.value.url, 'stage_attributes.source_delimeter': form.value.fileDelimeter,
    'stage_attributes.file_type':  form.value.fileType }, stageName: 'dbfs_sink'};

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
