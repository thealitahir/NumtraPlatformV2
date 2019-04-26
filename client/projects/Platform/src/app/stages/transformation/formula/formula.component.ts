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
export class FormulaComponent implements OnInit, OnChanges {
  @Input() stage_id: any;
  Types = ['stream', 'custom'];
  operators = ['+', '-', '*', '/', '%'];
  stage: any = {
    name: '',
    original_schema: [],
    selected_schema: [],
    stage_attributes: {
      output_fields: {
        field: '',
        type: ''
      },
      formula: '',
      expression: [],
      use_expression: false
    },
  };

  stage_subtype: any = 'Formula';
  stagetype: any = 'operation';
  stageSchema: any;
  datatypes: any;
  datatyp: any;
  data: any;
  schema: { original_schema: '' };

  constructor(public snackBar: MatSnackBar, public stageService: StageService) {
    this.stageService.getDataTypes().subscribe(datatype => {
      this.datatyp = datatype;
      this.datatypes = this.datatyp.data;
    });
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
            this.stage = schemadata.data;
            // this.stageSchema = schemadata.data.original_schema;
            console.log(this.stage);
            for (let i = 0; i === 1; i++) {
              // console.log(this.stage.in[i]);
              this.stageService.getStageSchema(this.stage.in[i]).subscribe(schdata => {
                // console.log(schdata.data);
                this.schema = schdata.data.original_schema;
                this.stageSchema = this.schema;
                // console.log(this.stageSchema);
                this.stage.original_schema = this.stageSchema;
                this.stage.selected_schema = this.stageSchema;
              });
            }
          });
        }
      }
    }
  }
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


  saveFormula(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    this.stage.original_schema.push(this.stage.stage_attributes.output_fields);
    this.stage.selected_schema.push(this.stage.stage_attributes.output_fields);
    this.data = {
      updatedata: {
        'name': this.stage.name, 'original_schema': this.stage.original_schema,
        'selected_schema': this.stage.selected_schema, 'stage_attributes': this.stage.stage_attributes
      }, stage_id: this.stage_id
    };
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
