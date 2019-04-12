import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { StageService } from '../../services/stage.service';
import { Section } from '../section.model';
import { Stage } from '../stage.model';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddStageComponent),
      multi: true
    }
  ]
})
export class AddStageComponent implements OnInit, ControlValueAccessor {

  sabled: boolean = false;
  sections: Section[] = [];
  stage: Stage = {
    title: "",
    subType: "",
    stageType: "",
    is_streaming: false,
    stage_attributes: "",
    section_id: "",
    icon: ""
  };
  selected_section: Section = null;
  stage_attributes: string = '{}';
  public config: AceConfigInterface = {
    mode: 'json',
    theme: 'github',
    readOnly: false
  };
  constructor(private router: Router, public stageService: StageService) { }

  ngOnInit() {
    console.log("in add stage component")
    this.stageService.getSections().subscribe(sections => {
      this.sections = sections.data;
      //this.selected_section = this.sections[0];
      //let section_ids:string[] = this.sections.map(a=>a.title);
      console.log(this.stage);
      if (sections.status == true) {
      } else {

      }
    });
  }

  saveStage() {
    console.log("in save");
    if (this.isJson(this.stage_attributes)) {
      this.stage.stageType = this.selected_section.title.toLowerCase();
      this.stage.section_id = this.selected_section._id;
      this.stage.stage_attributes = JSON.parse(this.stage_attributes);
      console.log(this.stage);
      this.stageService.saveComponent(this.stage).subscribe(data =>{

      });

    }
  }

  cancel() {
    console.log("in calncel");
    this.router.navigate(['/platform/stages']);
  }
  writeValue(value: any) {
    if (value !== undefined) {
      this.stage_attributes = value;
    }
  }
  //propagateChange = (_: any) => {};
  registerOnChange(fn) {
    //this.propagateChange = fn;
  }

  registerOnTouched() { }

  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

}
