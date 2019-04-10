import { Component, OnInit } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  data: any ;
  date_time_fields = [];
  Types = ['stream', 'custom' , 'parameter'];
  logicalOpArray = ['AND', 'OR'];
  operators = ['=', '!=', '>=', '<=', '<', '>', 'Null', 'Not null'];
  regex_operators = ['=', '!='];
  datetime = {start_time: '', end_time: ''};
  stage: any = {
    stage_attributes: {
        regex : [],
        use_regex : false ,
        end_time : '',
        start_time : '',
        date_time_field : '',
        use_time_window : false,
        expression : [],
        use_expression : false
    },
  };
  stagename: any = 'filter';
  stagetype: any = 'transformation';
  stageSchema: any;

  constructor(public snackBar: MatSnackBar, public stageService: StageService) {
    this.stageService.getStageSchema(this.stagename, this.stagetype).subscribe(schemadata => {
      console.log(schemadata);
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
      // console.log(this.stage.stage_attributes.parameter);
      // console.log(typeof(this.stage.stage_attributes.parameter));

    });
  }

  addFilter(type) {
    if (type === 'exp'){
      this.stage.stage_attributes.expression.push(
        {
          to_compare_field_name: '',
          to_compare_field_dataType: '',
          operator: '',
          with_compare_type: '',
          with_compare_field_name: '',
          with_compare_field_type: '',
          activeCustom: 'custom',
          logical_operator: '',
          showOptions: true
        }
      );
    }
    console.log( this.stage.stage_attributes.expression);
    if (type === 'regex') {
      this.stage.stage_attributes.regex.push({
          to_compare_field_name: '',
          to_compare_field_dataType: '',
          operator: '',
          regex: ''
      });
    }
  }

  setDataType(selected_field, index, type) {
    if (type === 'exp') {
      if (selected_field) {
          this.stage.stage_attributes.expression[index].to_compare_field_dataType = selected_field.type;
      }
    }
    if (type === 'regex') {
      if (selected_field) {
          this.stage.stage_attributes.regex[index].to_compare_field_dataType = selected_field.type;
      }
    }
  }

  showOptions(operator, index) {
    console.log(operator, index);
    if(operator === 'IS NULL' || operator === 'IS NOT NULL'){
        this.stage.stage_attributes.expression[index].showOptions = false;
    } else{
        this.stage.stage_attributes.expression[index].showOptions = true;
    }
    console.log( this.stage.stage_attributes.expression[index].showOptions);
  }

  setTypeOf(item, index) {
    if (item.with_compare_type === 'stream') { this.stage.stage_attributes.expression[index].activeCustom = 'stream'; }
    if (item.with_compare_type === 'custom') {this.stage.stage_attributes.expression[index].activeCustom = 'custom'; }
    if (item.with_compare_type === 'parameter') {this.stage.stage_attributes.expression[index].activeCustom = 'parameter'; }
    item.with_compare_field_name = '';
  }

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
            to_compare_field_name: '',
            to_compare_field_dataType: '',
            operator: '',
            with_compare_type: '',
            with_compare_field_name: '',
            with_compare_field_type: '',
            activeCustom: 'custom',
            logical_operator: '',
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

  saveTop(form: NgForm) {
    // console.log(form.value);

    this.data = {updatedata: {'stage_attributes': this.stage.stage_attributes}, stageName: this.stagename};
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

  cancel(){

  }

}
