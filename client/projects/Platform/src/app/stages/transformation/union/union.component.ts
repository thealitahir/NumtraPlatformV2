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
  @Input() stage_id: any = '58b41cbf8b9979a5e034c971';
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
    //console.log("stage Id : " + this.stage_id);
    if(this.stage_id){
      this.stageService.getStageSchema('58b41cbf8b9979a5e034c971').subscribe(schemadata => {
        // console.log(schemadata);
        this.stage = schemadata.data;
        // this.stageSchema = schemadata.data.original_schema;
       // console.log(this.stage);

        for (let i = 0; i < this.stage.in.length ; i++) {
          // console.log(this.stage.in[i]);
          this.stageService.getStageSchema(this.stage.in[i]).subscribe(schdata => {
            this.schema = schdata.data;
            this.stageSchema = schdata.data.original_schema;
            console.log(this.stageSchema);
            this.stages.push(this.schema);
            if (this.count < this.stageSchema.length) {
              this.count = this.stageSchema.length;
            }


            if(i === this.stage.in.length - 1){
              console.log(this.stages);
        console.log(this.count);
        //let count = this.stages[0].selected_schema.length;

           // console.log(this.stages);

            for (let c = 0; c < this.count; c++) {
              let row = [];
              for (let j = 0; j < this.stages.length; j++ ) {
                row.push({
                  stage_id : this.stages[j]._id,
                  field: this.stages[j].selected_schema[c].field,
                  checked: true
                });
              }
              // this.stages.forEach(function(inStage) {
              //     row.push({
              //       stage_id : inStage._id,
              //       field: inStage.selected_schema[c].field,
              //       checked: true
              //     });
              // });
              this.original_unions.push(row);
              //this.stage.stage_attributes.unions.push(row);
          }
        console.log( this.original_unions);


      //   if(this.stage.stage_attributes.unions.length !== 0 ){
      //     console.log('kamal h');
      //     for(var i=0 ; i<this.stage.stage_attributes.unions.length ; i++){
      //         if(typeof this.original_unions[i] !== 'undefined'){
      //           console.log('kamal h 12334');
      //             for(var j=0 ; j< this.stage.stage_attributes.unions[i].length ; j++){
      //                 this.original_unions[i][j].field = this.stage.stage_attributes.unions[i][j].field;
      //                 this.original_unions[i][j].checked = this.stage.stage_attributes.unions[i][j].checked;
      //             }
      //         }
      //     }
      //     console.log( this.original_unions);
      // }
            }
          });
        }

      });
    }
  }

  createSchema() {
    console.log('create schema');
    var selected_unions = [];
    // console.log(this.original_unions[0][0].checked);
    //Get the selected fields
    for (let i = 0; i < this.original_unions.length; i++) {
        if (this.original_unions[i][0].checked === true) {
          console.log('value = true');
          selected_unions.push(this.original_unions[i]);
          // console.log(this.stage.stage_attributes.selected_unions);
        }
    }

    this.stage.stage_attributes.selected_unions = selected_unions;
    console.log(this.stage.stage_attributes.selected_unions);

    //set the schema
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
    this.createSchema();
    this.stage.stage_attributes.unions = this.original_unions;
    console.log(this.stage.stage_attributes.unions);
    this.data = {updatedata: {'name': this.stage.name, 'stage_attributes': this.stage.stage_attributes}, stage_id: this.stage_id};
    this.stageService.updateStage(this.data).subscribe(data => {
      if (data.data.nModified === 1) {
        this.openSnackBar('Success:', 'Stage Saved Successfully!');
      } else {
        this.openSnackBar('Error:', 'Try Again!');
      }
    });
  }

}
