import { Component, OnInit, Input } from '@angular/core';
import { NgForm, CheckboxControlValueAccessor } from '@angular/forms';
import { StageService } from '../../../services/stage.service';
import { MatSnackBar , MatDialog } from '@angular/material';
import { EditorComponent } from '../../sources/editor-dialog/editor-dialog.component';

@Component({
  selector: 'app-union',
  templateUrl: './union.component.html',
  styleUrls: ['./union.component.css']
})
export class UnionComponent implements OnInit{
  @Input() stage_id: any;
  data: any ;
  stage: any = {
    stage_attributes: {
      selected_unions : [],
      unions : []
    }
  }
  stageSchema: any;
  schema: any;
  original_unions: any = [];
  stages: any = [];
  count: any= 0;
  stage_subtype: any = 'Union';
  stagetype: any = 'operation';

  constructor(public snackBar: MatSnackBar, public stageService: StageService, public dialog: MatDialog) {

    if(this.stage_id){
      this.stageService.getStageSchema('58b41cbf8b9979a5e034c971').subscribe(schemadata => {
        this.stage = schemadata.data;
        for (let i = 0; i < this.stage.in.length ; i++) {
          this.stageService.getStageSchema(this.stage.in[i]).subscribe(schdata => {
            this.schema = schdata.data;
            this.stageSchema = schdata.data.original_schema;
            this.stages.push(this.schema);
            if (this.count < this.stageSchema.length) {
              this.count = this.stageSchema.length;
            }

            if(i === this.stage.in.length - 1){
              for (let c = 0; c < this.count; c++) {
                let row = [];
                for (let j = 0; j < this.stages.length; j++ ) {
                  row.push({
                    stage_id : this.stages[j]._id,
                    field: this.stages[j].selected_schema[c].field,
                    checked: true
                  });
                }
                this.original_unions.push(row);
              }
              if(this.stage.stage_attributes.unions.length !== 0 ) {
                console.log('kamal h');
                for(var k=0 ; k<this.stage.stage_attributes.unions.length ; k++){
                  if(typeof this.original_unions[k] !== 'undefined'){
                    for(var j=0 ; j< this.stage.stage_attributes.unions[k].length ; j++){
                        this.original_unions[k][j].field = this.stage.stage_attributes.unions[k][j].field;
                        this.original_unions[k][j].checked = this.stage.stage_attributes.unions[k][j].checked;
                    }
                  }
                }
              }
            }
          });
        }
      });
    }
  }

  createSchema() {
    var selected_unions = [];
    for (let i = 0; i < this.original_unions.length; i++) {
        if (this.original_unions[i][0].checked === true) {
          selected_unions.push(this.original_unions[i]);
        }
    }
    this.stage.stage_attributes.selected_unions = selected_unions;
    let schema = [];
    selected_unions.forEach(function(union,index){
        schema.push({
            type: 'string',
            position: index,
            field: union[0].field,
            alias: union[0].field,
            checked : true
        });
    });
    this.stage.selected_schema = schema;
    this.stage.original_schema = schema;
  }

  ngOnInit() {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  saveUnion(form: NgForm) {
    if (form.invalid) {
      this.openSnackBar('Error:', 'Fill all Fields!');
      return;
    }
    this.stage.stage_attributes.unions = this.original_unions;
    this.createSchema();
    this.data = {updatedata: {'name': this.stage.name,'original_schema': this.stage.original_schema, 'selected_schema': this.stage.selected_schema ,'stage_attributes': this.stage.stage_attributes}, stage_id: this.stage_id};
    this.stageService.updateStage(this.data).subscribe(data => {
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }
    });
  }


}
