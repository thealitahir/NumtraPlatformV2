import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';
import { StageService } from '../../services/stage.service';
import { Section } from '../section.model';
import { Stage } from '../stage.model';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.css']
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
  }

  cancel() {
    this.router.navigate(['/stages']);
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
