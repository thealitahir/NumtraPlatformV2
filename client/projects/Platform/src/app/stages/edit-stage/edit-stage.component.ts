import 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import { Component, OnInit , Input, forwardRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AceComponent, AceDirective, AceConfigInterface } from 'ngx-ace-wrapper';
import { StageService } from '../../services/stage.service';
import { Section } from '../section.model';
import { Stage } from '../stage.model';

@Component({
  selector: 'app-edit-stage',
  templateUrl: './edit-stage.component.html',
  styleUrls: ['./edit-stage.component.css'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditStageComponent),
      multi: true
    }
  ]
})
export class EditStageComponent implements OnInit, ControlValueAccessor {

  public content: string = '{}';
  public disabled: boolean = false;
  sections : Section[] = [];
  stage: Stage = null;
  selected_section : Section = null;
  stage_attributes : string;
  public config: AceConfigInterface = {
    mode: 'json',
    theme: 'github',
    readOnly : false
  };

  constructor(private router: Router , public stageService: StageService, public route:ActivatedRoute) { }

  ngOnInit() {
    console.log("in edit stage component")
    const param = this.route.snapshot.paramMap.get('id');
    this.stageService.getSections().subscribe(sections => {
      this.sections = sections.data;
      //let section_ids:string[] = this.sections.map(a=>a.title);
      console.log(sections);
      if (sections.status == true && param != null) {
        console.log(param);
        this.stageService.getStage(param).subscribe(res => {
          this.stage = res.data;
          this.stage_attributes = JSON.stringify(this.stage.stage_attributes, null, '\t');
          console.log(this.stage_attributes);
          console.log(this.stage);
          for (var i = 0; i < this.sections.length; i++) {
            if (this.sections[i]._id == this.stage.section_id) {
              this.selected_section = this.sections[i];
            }
          }
          console.log("selected section ", this.selected_section);
        });
      } else {

      }
    });
  }

  updateStage(){
    console.log("in update");
    if (this.isJson(this.stage_attributes)) {
      this.stage.stageType = this.selected_section.title.toLowerCase();
      this.stage.section_id = this.selected_section._id;
      this.stage.stage_attributes = JSON.parse(this.stage_attributes);
      console.log(this.stage);
      this.stageService.updateComponent(this.stage).subscribe(data =>{
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
  propagateChange = (_: any) => {};
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
  isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

}
