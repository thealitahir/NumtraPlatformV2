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
  showFilter: boolean = false;
  showBottom: boolean = false;
  showQuery: boolean = false;

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
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.text == "DBFS" && !this.showSource){
      this.showSource = true;
      this.showTransformation = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.text == "DBFS" && this.showSource){
      this.showSource = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Top" && !this.showTransformation){
      this.showTransformation = true;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Top" && this.showTransformation){
      this.showTransformation = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Bottom" && !this.showTransformation){
      this.showTransformation = false;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = true;
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Bottom" && this.showTransformation){
      this.showBottom = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Filter" && !this.showTransformation){
      this.showTransformation = false;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = true;
      this.showBottom = false;
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Filter" && this.showTransformation){
      this.showFilter = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Query" && !this.showTransformation){
      this.showTransformation = false;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = true;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Query" && this.showTransformation){
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "sink" && !this.showSink){
      this.showSink = true;
      this.showTransformation = false;
      this.showSource = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = false;
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
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.text == "Cosmos DB" && this.showSource){
      this.showCosmos = false;
    }
      
  }

}
