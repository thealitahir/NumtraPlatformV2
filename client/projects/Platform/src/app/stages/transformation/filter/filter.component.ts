import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() stage_id: any;
  data: any ;
  date_time_fields = [];
  Types = ['stream', 'custom' , 'parameter'];
  logicalOpArray = ['AND', 'OR'];
  operators = ['=', '!=', '>=', '<=', '<', '>', 'Null', 'Not null'];
  regex_operators = ['=', '!='];
  datetime = {start_time: '', end_time: ''};
  stage: any = {
    name: '',
    stage_attributes: {
        regex : [],
        use_regex : false ,
        expression : [],
        use_expression : false
    },
  };

  stage_subtype: any = 'Filter';
  stagetype: any = 'transformation';
  stageSchema: any;

  constructor(public snackBar: MatSnackBar, public stageService: StageService) {  }

  ngOnInit(){
  }
  ngOnChanges(changes: any) {
    for (let propName in changes) {
      // only run when property "task" changed
      if (propName === 'stage_id') {
        console.log("stage Id : " + this.stage_id);
        if (this.stage_id) {
          this.stageService.getStageSchema(this.stage_id).subscribe(schemadata => {
            this.stage = schemadata.data;
            this.stageSchema = schemadata.data.original_schema;
            // console.log(this.stage.stage_attributes.parameter);
            // console.log(typeof(this.stage.stage_attributes.parameter));

          });
        }
      }
    }
  }

  addFilter(type) {
    if (type === 'exp') {
      this.stage.stage_attributes.expression.push(
        {
          column1_name: '',
          operator: '',
          column2_name: '',
          custom: true,
          custom_value: '',
          value_type: '',
          combinator: '',
          showOptions: true
        }
      );
    }
    if (type === 'regex') {
      this.stage.stage_attributes.regex.push({
          to_compare_field_name: '',
          to_compare_field_dataType: '',
          operator: '',
          regex: ''
      });
    }
  }

  // setDataType(selected_field, index, type) {
  //   if (type === 'exp') {
  //     if (selected_field) {
  //         this.stage.stage_attributes.expression[index].to_compare_field_dataType = selected_field.type;
  //     }
  //   }
  //   if (type === 'regex') {
  //     if (selected_field) {
  //         this.stage.stage_attributes.regex[index].to_compare_field_dataType = selected_field.type;
  //     }
  //   }
  // }

  showOptions(operator, index) {
    if(operator === 'IS NULL' || operator === 'IS NOT NULL'){
        this.stage.stage_attributes.expression[index].showOptions = false;
    } else{
        this.stage.stage_attributes.expression[index].showOptions = true;
    }
  }

  // setTypeOf(item, index) {
  //   if (item.with_compare_type === 'stream') { this.stage.stage_attributes.expression[index].activeCustom = 'stream'; }
  //   if (item.with_compare_type === 'custom') {this.stage.stage_attributes.expression[index].activeCustom = 'custom'; }
  //   if (item.with_compare_type === 'parameter') {this.stage.stage_attributes.expression[index].activeCustom = 'parameter'; }
  //   item.with_compare_field_name = '';
  // }

  setStreamDataType(stream_selected_field, index) {
    if(stream_selected_field) {
      this.stage.stage_attributes.expression[index].with_compare_field_dataType = stream_selected_field.type;
    }

  }

  removeFilter(index,type) {
    if (type === 'exp'){
        this.stage.stage_attributes.expression.splice(index,1);
      }
    if (type === 'regex'){
        this.stage.stage_attributes.regex.splice(index,1);
      }
  }

  addRemoveExp(value) {
    if (value) {
        this.stage.stage_attributes.expression.push({
          column1_name: '',
          operator: '',
          column2_name: '',
          custom: true,
          custom_value: '',
          value_type: '',
          combinator: '',
          showOptions: true
        });
    } else {
        this.stage.stage_attributes.expression = [];
    }

  }

  addRemoveRegex(value) {
    if (value) {
        this.stage.stage_attributes.regex.push({
            to_compare_field_name: '',
            to_compare_field_dataType: '',
            operator: '',
            regex: ''
        });
    } else {
        this.stage.stage_attributes.regex = [];
    }
  }

  saveFilter(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    this.data = {updatedata: {'name': this.stage.name, 'stage_attributes': this.stage.stage_attributes}, stage_id: this.stage_id};
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

  cancel(){

  }

}
