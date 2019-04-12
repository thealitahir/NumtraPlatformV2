import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-pipeline-designer',
  templateUrl: './pipeline-designer.component.html',
  styleUrls: ['./pipeline-designer.component.css']
})
export class PipelineDesignerComponent implements OnInit {

  showSource: boolean = false;
  showSink: boolean = false;
  showTransformation: boolean = false;
  showCosmos: boolean = false;
  pipline_id: string =''
  constructor(public router: Router, public route:ActivatedRoute) { }

  ngOnInit() {
    console.log("PipelineDesignerComponent");
    this.pipline_id = this.route.snapshot.paramMap.get('id');
    console.log(this.pipline_id);
  }

  stageClicked(value){
    if(!value.model){
      this.showTransformation = false;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.text == "DBFS" && !this.showSource){
      this.showSource = true;
      this.showTransformation = false;
      this.showSink = false;
      this.showCosmos = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.type == "DBFS" && this.showSource){
      this.showSource = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" && !this.showTransformation){
      this.showTransformation = true;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" && this.showTransformation){
      this.showTransformation = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "sink" && !this.showSink){
      this.showSink = true;
      this.showTransformation = false;
      this.showSource = false;
      this.showCosmos = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "sink" && this.showSink){
      this.showSink = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.text == "Cosmos DB" && !this.showSource){
      this.showCosmos = true;
      this.showTransformation = false;
      this.showSink = false;
      this.showSource = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.type == "Cosmos DB" && this.showSource){
      this.showCosmos = false;
    }
      
  }

}
