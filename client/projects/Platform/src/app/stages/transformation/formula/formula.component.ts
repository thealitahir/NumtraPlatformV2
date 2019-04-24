import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar } from '@angular/material';
import { comparer } from 'mobx';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {
  @Input() stage_id: any = '5808ce3ad220bf0f0386f180';
  Types = ['stream', 'custom'];
  operators = ['+', '-', '*', '/', '%'];
  stage: any = {
    name: '',
    stage_attributes: {
        output_fields : {
          field: '',
          type: ''
        },
        formula : '',
        expression : [],
        use_expression : false
    },
  };

  stage_subtype: any = 'Formula';
  stagetype: any = 'operation';
  stageSchema: any;
  datatypes: any;
  datatyp: any;
  data: any;

  constructor(public snackBar: MatSnackBar, public stageService: StageService) {
    this.stageService.getDataTypes().subscribe(datatype => {
      this.datatyp = datatype;
      this.datatypes = this.datatyp.data;
    });

    this.stageService.getStageSchema('5808ce3ad220bf0f0386f180').subscribe(schemadata => {
      this.stage = schemadata.data;
      this.stageSchema = schemadata.data.original_schema;
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
  add(value) {
    if (value) {
        if (this.stage.stage_attributes.expression.length === 0) {
            this.stage.stage_attributes.expression.push(
                {
                  value1_type: '',
                  value1: '',
                  operator: '',
                  value2_type: '',
                  value2: '',
                  combinator: ''
                });
        }
      }
  }

  addExp() {
    this.stage.stage_attributes.expression.push(
        {
            value1_type: '',
            value1: '',
            operator: '',
            value2_type: '',
            value2: '',
            combinator: ''
        }
    )
  }

  removeExp(index) {
    this.stage.stage_attributes.expression.splice(index, 1);
  }

  // setType(item, index , type) {
  //   console.log(typeof(type));
  //   if (type === 'toCompare') {
  //     console.log('to comparer');
  //     if (item.to_compare_field_type === 'stream') {
  //       console.log(item.to_compare_field_type);
  //       this.stage.stage_attributes.expression[index].activeCustom1 = 'stream';
  //       console.log(this.stage.stage_attributes.expression[index].activeCustom1);
  //     }
  //     if (item.to_compare_field_type === 'custom') {
  //       console.log(item.to_compare_field_type);
  //       this.stage.stage_attributes.expression[index].activeCustom1 = 'custom';
  //       console.log(this.stage.stage_attributes.expression[index].activeCustom1);
  //      }

  //     item.to_compare_field_name = '';
  //   }
  //   if (type == 'withCompare') {
  //     if (item.with_compare_field_type === 'stream') { this.stage.stage_attributes.expression[index].activeCustom2 = 'stream';}
  //     if (item.with_compare_field_type === 'custom') { this.stage.stage_attributes.expression[index].activeCustom2 = 'custom';}

  //     item.with_compare_field_name = '';
  //   }


  // }

  //  setDataType(selected_field, index, type) {
  //   if (type === 'toComapre') {
  //     if (selected_field) {
  //         this.stage.stage_attributes.expression[index].to_compare_field_dataType = selected_field.type;
  //     }
  //   }
  //   if (type === 'withCompare') {
  //     if (selected_field) {
  //         this.stage.stage_attributes.expression[index].with_compare_field_dataType = selected_field.type;
  //     }
  //   }
  // }

  saveFormula(form: NgForm) {
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


}
