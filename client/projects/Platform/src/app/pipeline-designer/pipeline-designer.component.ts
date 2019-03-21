import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipeline-designer',
  templateUrl: './pipeline-designer.component.html',
  styleUrls: ['./pipeline-designer.component.css']
})
export class PipelineDesignerComponent implements OnInit {

  showSource: boolean = false;
  showSink: boolean = false;
  showTransformation: boolean = false;
  constructor() { }

  ngOnInit() {
    console.log("PipelineDesignerComponent");
  }

  stageClicked(value){
    if(value && value.model.attributes.attrs.label.type == "source" && !this.showSource){
      this.showSource = true;
      this.showTransformation = false;
      this.showSink = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" && this.showSource){
      this.showSource = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" && !this.showTransformation){
      this.showTransformation = true;
      this.showSource = false;
      this.showSink = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" && this.showTransformation){
      this.showTransformation = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "sink" && !this.showSink){
      this.showSink = true;
      this.showTransformation = false;
      this.showSource = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "sink" && this.showSink){
      this.showSink = false;
    }
      
  }

}
