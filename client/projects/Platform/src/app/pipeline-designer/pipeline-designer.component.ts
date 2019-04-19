import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-pipeline-designer',
  templateUrl: './pipeline-designer.component.html',
  styleUrls: ['./pipeline-designer.component.css']
})
export class PipelineDesignerComponent implements OnInit {

  showSource: boolean = false; showSourceId: string;
  showSink: boolean = false; showSinkId: string;
  showTop: boolean = false; showTopId: string; 
  showCosmos: boolean = false; showCosmosId: string;
  showFilter: boolean = false; showFilterId: string;
  showBottom: boolean = false; showBottomId: string;
  showQuery: boolean = false; showQueryId: string;

  pipeline_id: string =''
  constructor(public router: Router, public route:ActivatedRoute) { }

  ngOnInit() {
    console.log("PipelineDesignerComponent");
    this.pipeline_id = this.route.snapshot.paramMap.get('id');
    console.log(this.pipeline_id);
  }

  stageClicked(value){
    var mongoId: string;
    if(value.model){
      mongoId = value.model.attributes.attrs._id;
      console.log("stage mongoId : " + mongoId);
    }
    if(!value.model){
      this.showTop = false;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = false;
    }
    else if(value && value.model.attributes.attrs.label.type == "source" &&
    value.model.attributes.attrs.label.text == "DBFS" && !this.showSource){
      this.showSource = true; this.showSourceId = mongoId;
      this.showTop = false;
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
    value.model.attributes.attrs.label.text == "Top" && !this.showTop){
      this.showTop = true; this.showTopId = mongoId;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Top" && this.showTop){
      this.showTop = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Bottom" && !this.showTop){
      this.showTop = false; 
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = true; this,this.showBottomId = mongoId;
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Bottom" && this.showTop){
      this.showBottom = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Filter" && !this.showTop){
      this.showTop = false;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = true; this.showFilterId = mongoId;
      this.showBottom = false;
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Filter" && this.showTop){
      this.showFilter = false;
    }

    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Query" && !this.showTop){
      this.showTop = false;
      this.showSource = false;
      this.showSink = false;
      this.showCosmos = false;
      this.showFilter = false;
      this.showBottom = false;
      this.showQuery = true; this.showQueryId = mongoId;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "operation" &&
    value.model.attributes.attrs.label.text == "Query" && this.showTop){
      this.showQuery = false;
    }
      
    else if(value && value.model.attributes.attrs.label.type == "sink" && !this.showSink){
      this.showSink = true; this.showSinkId = mongoId;
      this.showTop = false;
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
      this.showCosmos = true; this.showCosmosId = mongoId;
      this.showTop = false;
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
