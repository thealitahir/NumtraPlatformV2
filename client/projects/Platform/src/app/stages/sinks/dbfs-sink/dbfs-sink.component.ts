import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../../../services/stage.service';

@Component({
  selector: 'app-dbfs-sink',
  templateUrl: './dbfs-sink.component.html',
  styleUrls: ['./dbfs-sink.component.css']
})
export class DbfsSinkComponent implements OnInit {

  constructor(public stageService: StageService) { }
  data: any ;
  ngOnInit() {
  }

  saveSinkDbfs(form: NgForm) {
    this.data = {formdata: form.value};
    console.log(this.data);
    this.data = {updatedata: { 'stage_attributes.url': form.value.url, 'stage_attributes.source_delimeter': form.value.filedelimeter,
    'stage_attributes.file_type':  form.value.filetype },
     stageName: 'dbfs_sink'};

    this.stageService.updateStage(this.data).subscribe(data => {
      console.log(data);
    });
  }

}
