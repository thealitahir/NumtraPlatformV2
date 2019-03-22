import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-data-explorer',
  templateUrl: './data-explorer.component.html',
  styleUrls: ['./data-explorer.component.css']
})
export class DataExplorerComponent implements OnInit {
  data: any ;
  stage: any = {
    stage_attributes: {
      url: '',
      source_delimeter: '',
      file_type: ''
    }
  };

  constructor(public stageService: StageService, public snackBar: MatSnackBar) {
    this.stageService.getpipelineData().subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
    });
   }

  ngOnInit() {
  }

}
