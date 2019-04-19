import { Component, OnInit,Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dbfs-sink',
  templateUrl: './dbfs-sink.component.html',
  styleUrls: ['./dbfs-sink.component.css']
})
export class DbfsSinkComponent implements OnInit, OnChanges {
  data: any ;
  @Input() stage_id: any;
  stage: any = {
    name: '',
    stage_attributes: {
      url: '',
      source_delimeter: '',
      file_type: ''
    }
  };
  stage_subtype: any = 'DBFS';
  stageType: any = 'sink';
  constructor(public stageService: StageService, public snackBar: MatSnackBar) {
    
   }

  ngOnInit() {
  }

  ngOnChanges(changes: any) { 
    for (let propName in changes) {
      // only run when property "task" changed 
      if (propName === 'stage_id') {
        console.log("stage Id : " + this.stage_id);
        if (this.stage_id) {
          this.stageService.getStageSchema(this.stage_id).subscribe(schemadata => {
            console.log(schemadata);
            this.stage = schemadata.data;
          });
        }
      }
    } 
  } 

  saveSinkDbfs(form: NgForm) {
    this.data = {formdata: form.value};
    console.log(this.data);
    this.data = {updatedata: { 'name': this.stage.name, 'stage_attributes.url': form.value.url, 'stage_attributes.source_delimeter': form.value.fileDelimeter,
    'stage_attributes.file_type':  form.value.fileType, 'stage_attributes.dbfs_token': form.value.dbfstoken,
    'stage_attributes.dbfs_domain':  form.value.dbfsdomain }, stage_id: this.stage_id};

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
