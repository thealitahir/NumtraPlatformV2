import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar } from '@angular/material';
import { comparer } from 'mobx';

@Component({
  selector: 'app-aggregation',
  templateUrl: './aggregation.component.html',
  styleUrls: ['./aggregation.component.css']
})
export class AggregationComponent implements OnInit {
  @Input() stage_id: any = '5811b4195b2686b20192a349';
  stage: any = {
    name: '',
    stage_attributes : {
      group_by : [],
      aggregate_on : []
    },
  };

  stage_subtype: any = 'Aggregation';
  stagetype: any = 'operation';
  stageSchema: any;
  data: any;
  aggregate = [];
  items = [];

  method = [
      {type: 'Method', function: 'sum', value: 'SUM' ,active : true},
      {type: 'Method', function: 'average', value: 'AVG' , active : true},
      {type: 'Method', function: 'min', value: 'MIN', active : true},
      {type: 'Method', function: 'max', value: 'MAX', active : true},
      {type: 'Count' , function: 'all', value: 'all', active : true},
      {type: 'Count' , function: 'empty', value: 'empty' ,active : true},
      {type: 'Count' , function: 'non empty', value: 'non empty' ,active : true},
      {type: 'Count' , function: 'unique', value: 'unique' , active : true},
      {type: 'Count' , function: 'custom', value: 'custom' , active : true},
  ];

  constructor(public snackBar: MatSnackBar, public stageService: StageService) {
    this.stageService.getStageSchema('5811b4195b2686b20192a349').subscribe(schemadata => {

      this.stage = schemadata.data;
      //this.stageSchema = schemadata.data.original_schema;
      // this.aggregate = this.stage.stage_attributes.aggregate_on;
      for (let i = 0; i < this.stage.in.length; i++) {
        this.stageService.getStageSchema(this.stage.in[i]).subscribe(schdata => {
          let schema = schdata.data;
          this.stageSchema = schema.original_schema;
        });
      }
    });
   }

  ngOnInit() {

  }

  // ngOnChanges(changes: any) {
  //   for (let propName in changes) {
  //     // only run when property "task" changed
  //     if (propName === 'stage_id') {
  //       console.log("stage Id : " + this.stage_id);
  //       if (this.stage_id) {
  //         this.stageService.getStageSchema(this.stage_id).subscribe(schemadata => {
  //           this.stage = schemadata.data;
  //           this.stageSchema = schemadata.data.original_schema;
  //           // console.log(this.stage.stage_attributes.parameter);
  //           // console.log(typeof(this.stage.stage_attributes.parameter));

  //         });
  //       }
  //     }
  //   }
  // }

  addAggregateField() {

    this.stage.stage_attributes.aggregate_on.push({
        input_field: '',
        method: '',
        aggregate_field: '',
        value_to_count : '',
        method_type: '',
        count_custom_value : ''
    });
  }

  removeAggregateField(index) {
    this.stage.stage_attributes.aggregate_on.splice(index, 1 );
  }
  setAlias1(item) {
    item.method = '';
    item.aggregate_field = item.input_field + '_' + item.method;
  }

  setAlias2(item) {

    if (item.input_field !== '') {
      item.aggregate_field = item.input_field + '_' + item.method;
      const obj = this.method.find( obj => obj.function === item.method).type;
      item.method_type =  obj;
      if(item.method === 'custom'){
          item.value_to_count = 'custom';
          item.count_custom_value = '';
      }
    }
  }

  saveAggregation(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    this.stage.orignal_schema = [];
    this.stage.selected_schema = [];

    for ( let i = 0; i < this.stage.stage_attributes.aggregate_on.length; i++) {
      const obj = {field: this.stage.stage_attributes.aggregate_on[i].aggregate_field,
        alias: this.stage.stage_attributes.aggregate_on[i].aggregate_field };
      this.stage.orignal_schema.push(obj);
      this.stage.selected_schema.push(obj);
    }
    for ( let i = 0; i < this.stage.stage_attributes.group_by.length; i++) {
      const obj = {field: this.stage.stage_attributes.group_by[i],
        alias: this.stage.stage_attributes.group_by[i] };
      this.stage.orignal_schema.push(obj);
      this.stage.selected_schema.push(obj);
    }


    this.data = {updatedata: {'name': this.stage.name, 'original_schema': this.stage.orignal_schema,
    'selected_schema': this.stage.selected_schema, 'stage_attributes': this.stage.stage_attributes}, stage_id: this.stage_id};
    this.stageService.updateStage(this.data).subscribe(data => {
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
