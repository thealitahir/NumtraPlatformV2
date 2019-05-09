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
  addProfileForm: boolean = false;
  selectedIndex: number = 0;
  credentialGate: boolean = true;
  credentialProfiles: any = [];
  selected_profile: any = null;
  clusters: any = [];
  selected_cluster: any = null;
  keep_cluster_persistent:boolean = false;
  profile: any = {
    name:'',
    domain:'',
    token:''
  }
  cluster_data: any = {
    cluster_name:'',
    spark_version:'',
    autotermination_minutes:0,
    node_type_id:'',
    autoscale:{
      min_workers:0,
      max_workers:0
    },
    spark_env_vars:{
      PYSPARK_PYTHON:''
    }
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
      this.addProfileForm = false;
    });
  }

  fetchClusters(selected_profile){
    console.log("fetch clusters");
    console.log(selected_profile);
    this.pipelineExecutionService.getClusters(selected_profile).subscribe(data => {
      console.log("clusters");
      this.clusters = data.clusters;
      console.log(this.clusters);
    });
  }

  saveAndExecute(form){
    if (form.invalid) {
      //this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    var data = {
      clusterInfo:{},
      cluster_id:'',
      is_new_cluster: true,
      process_id:'',
      domain_profile:{
        domain:'',
        token:''
      },
      keep_cluster_persistent:false
    };
    this.cluster_data.cluster_name = form.value.name;
    this.cluster_data.spark_version = form.value.spark_version;
    this.cluster_data.autotermination_minutes = form.value.autotermination_minutes;
    this.cluster_data.node_type_id = form.value.node_type_id;
    this.cluster_data.autoscale.min_workers = form.value.min_workers;
    this.cluster_data.autoscale.max_workers = form.value.max_workers;
    this.cluster_data.spark_env_vars.PYSPARK_PYTHON = form.value.spark_env_vars;

    data.clusterInfo = this.cluster_data;
    data.keep_cluster_persistent = this.keep_cluster_persistent;
    data.process_id = this.pipeline_id;

    data.domain_profile.domain = this.selected_profile.domain;
    data.domain_profile.token = this.selected_profile.token;
    console.log(data);
    this.pipelineExecutionService.executePipeline(data).subscribe(record => {

    });
  }

  execute(cluster){
    console.log("existing execution ", cluster);
    var data = {
      clusterInfo:{},
      cluster_id:'',
      is_new_cluster: false,
      process_id:'',
      domain_profile:{
        domain:'',
        token:''
      },
      keep_cluster_persistent:false
    };
    data.cluster_id = cluster.cluster_id;
    data.process_id = this.pipeline_id;
    data.domain_profile.domain = this.selected_profile.domain;
    data.domain_profile.token = this.selected_profile.token;
    console.log(data);
    this.pipelineExecutionService.executePipeline(data).subscribe(record => {

    });
  }

}
