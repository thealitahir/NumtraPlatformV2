import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { PipelineExecutionService } from '../../services/pipeline-execution.service';
@Component({
  selector: 'app-pipeline-execution',
  templateUrl: './pipeline-execution.component.html',
  styleUrls: ['./pipeline-execution.component.css']
})

export class PipelineExecutionComponent implements OnInit, OnChanges {

  execution: boolean = true;
  credentialProfiles: any = [];
  selected_profile: any = null;
  profile: any = {
    name:'',
    domain:'',
    token:''
  };
  @Input() pipeline_id: any;

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public pipelineExecutionService: PipelineExecutionService) {
  }
  ngOnInit() {
    this.pipelineExecutionService.getProfile().subscribe(data => {
      this.credentialProfiles = data.data;
      console.log("credential profiles");
      console.log(this.credentialProfiles);
    });
  }
  
  ngOnChanges(changes: any) {
    for (let propName in changes) {
      // only run when property "task" changed
      if (propName === 'stage_id') {
        console.log("pipeline Id in execute piepline: " + this.pipeline_id);
        if (this.pipeline_id) {
          
        }
      }
    }
  }

  saveProfile(form){
    if (form.invalid) {
      //this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    this.profile.name = form.value.name;
    this.profile.domain = form.value.domain;
    this.profile.token = form.value.token;
    this.pipelineExecutionService.saveProfile(this.profile).subscribe(data => {
      console.log("profile saved");
      console.log(data);
      this.credentialProfiles.push(data.data);
    });
  }

  fetchClusters(selected_profile){
    console.log("fetch clusters");
    console.log(selected_profile);
    this.pipelineExecutionService.getClusters(selected_profile).subscribe(data => {

    });
  }

}
