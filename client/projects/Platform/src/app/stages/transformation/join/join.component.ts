import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit, OnChanges {
  @Input() stage_id: any = '5811f77c76aa9615b896d89c';
  Types = ['stream', 'custom'];
  operators = ['+', '-', '*', '/', '%'];
  stage: any = {
    name: '',
    stage_attributes: {
      stageB: '',
      stageA: '',
      keys: [],
      join_type: ''
    },
  };

  stage_subtype: any = 'Join';
  stagetype: any = 'operation';
  stageSchema: any;
  datatypes: any;
  datatyp: any;
  data: any;
  joinStages: any = [];
  stageA_fields: any;
  stageA: any = { original_schema: '' };
  stageB: any = { original_schema: '' };
  stageB_fields: any;

  constructor(public snackBar: MatSnackBar, public stageService: StageService) {

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
            this.stageSchema = schemadata.data.original_schema;
            console.log(this.stageSchema);
            this.joinStages = [];
            for (let i = 0; i < this.stage.in.length; i++) {
              this.stageService.getStageSchema(this.stage.in[i]).subscribe(schdata => {
                const schema = schdata.data;
                this.joinStages.push(schema);
                if (this.joinStages.length === 1) {
                  this.stageA = this.joinStages[0];
                  this.stageA_fields = this.stageA.original_schema;
                  //console.log(this.stageA_fields);
                }
                if (this.joinStages.length > 1) {
                  this.stageB = this.joinStages[1];
                  this.stageB_fields = this.stageB.original_schema;
                  // console.log(this.stageB_fields);
                }
              });
            }
            // console.log(this.joinStages);

          });
        }
      }
    }
  }

  saveJoin(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    const obj = [];
    this.stage.stage_attributes.stageA = this.joinStages[0]._id;
    this.stage.stage_attributes.stageB = this.joinStages[1]._id;

      for (let i = 0; i < this.stageA_fields.length; i++) {
        obj.push(this.stageA_fields[i]);
      }
      for (let j = 0; j < this.stageB_fields.length; j++) {
        obj.push(this.stageB_fields[j]);
      }
      this.stage.original_schema = [];
      this.stage.selected_schema = [];
<<<<<<< HEAD
      this.stage.original_schema = obj;
      this.stage.selected_schema = obj;
      console.log(this.stage.original_schema);

    // setTimeout(() => {
      this.data = {updatedata: {'name': this.stage.name,  'original_schema': this.stage.original_schema,
    'selected_schema': this.stage.selected_schema, 'stage_attributes': this.stage.stage_attributes}, stage_id: this.stage_id};
      this.stageService.updateStage(this.data).subscribe(data => {
        if (data.data.nModified === 1) {
          this.openSnackBar('Success:', 'Stage Saved Successfully!');
        } else {
          this.openSnackBar('Error:', 'Try Again!');
        }
      });
    // }, 3000);

=======
      this.stage.orignal_schema.push(obj);
      this.stage.selected_schema.push(obj);
      console.log(this.stage.orignal_schema);
    }

    if (this.stage.stage_attributes.join_type === 'leftouter') {
      console.log('left');
      this.stage.orignal_schema = [];
      this.stage.selected_schema = [];
      this.stage.orignal_schema = this.stageA_fields;
      this.stage.selected_schema = this.stageA_fields;
      console.log(this.stage.orignal_schema);
    }

    if (this.stage.stage_attributes.join_type === 'rightouter') {
      console.log('right');
      this.stage.orignal_schema = [];
      this.stage.selected_schema = [];
      this.stage.orignal_schema = this.stageB_fields;
      this.stage.selected_schema = this.stageB_fields;
      console.log(this.stage.orignal_schema);
    }
    this.data = {
      updatedata: {
        'name': this.stage.name, 'original_schema': this.stage.orignal_schema,
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
>>>>>>> 4154e4d499a0ca972f4601edca1bbd78f6ae7832
  }

  addKey() {
    this.stage.stage_attributes.keys.push({ fieldA: '', fieldB: '' });
  }

  removeKey(index) {
    this.stage.stage_attributes.keys.splice(index, 1);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
