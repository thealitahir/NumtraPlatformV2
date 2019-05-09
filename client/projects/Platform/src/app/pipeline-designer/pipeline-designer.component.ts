import { 
  Component,
   OnInit,
   ViewChild,
   ViewContainerRef,
   ComponentFactoryResolver 
  } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
//Sources Component imports
import { DbfsComponent } from '../stages/sources/DBFS/DBFS.component';
import { BlobStorageComponent } from '../stages/sources/blob-storage/blob-storage.component';
import { CosmosDBComponent } from '../stages/sources/cosmosDB/cosmosDB.component';
import { MongoDBComponent } from '../stages/sources/mongoDB/mongoDB.component';


//Sink Component imports
import { BlobStorageSinkComponent } from '../stages/sinks/blob-storage-sink/blob-storage-sink.component';
import { CosmosDBSinkComponent } from '../stages/sinks/cosmosDB-sink/cosmosDB-sink.component';
import { DbfsSinkComponent } from '../stages/sinks/dbfs-sink/dbfs-sink.component';
import { MongoDBSinkComponent } from '../stages/sinks/mongoDB-sink/mongoDB-sink.component';


//Transformation Component imports
import { AggregationComponent } from '../stages/transformation/aggregation/aggregation.component';
import { FilterComponent } from '../stages/transformation/filter/filter.component';
import { FormulaComponent } from '../stages/transformation/formula/formula.component';
import { JoinComponent } from '../stages/transformation/join/join.component';
import { MaxComponent } from '../stages/transformation/max/max.component';
import { MinComponent } from '../stages/transformation/min/min.component';
import { QueryComponent } from '../stages/transformation/query/query.component';
import { TagComponent } from '../stages/transformation/tag/tag.component';
import { UnionComponent } from '../stages/transformation/union/union.component';




@Component({
  selector: 'app-pipeline-designer',
  templateUrl: './pipeline-designer.component.html',
  styleUrls: ['./pipeline-designer.component.css']
})
export class PipelineDesignerComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;    
  
  childComponents = {
    "source":{
      'DBFS':DbfsComponent,
      'CosmosDB':CosmosDBComponent,
      'MongoDB':MongoDBComponent,
      'BlobStorage' :BlobStorageComponent,
      'Data Lake':null,
      'RDBMS':null,
      'Kraken':null,
      'Twitter':null,
      'Aerospike':null,
      'GIS Map':null,
      'Amazonsqs':null,
      'Cassadra' :null,
      'File' :null,
      'Ftp' :null,
      'Hana' :null,
      'Hbase' :null,
      'Kinesis' :null,
      'Redshift' :null,
      'Rss Feeds' :null,
      'Streaming Lake':null,
      'K-MEANS Streaming':null    
    },    
    "sink":{
      'CosmosDB':CosmosDBSinkComponent,
      'MongoDB':MongoDBSinkComponent,
      'DBFS':DbfsSinkComponent,
      'BlobStorage':BlobStorageSinkComponent,
      'S3' :null,
      'RDBMS' :null,
      'Smart' :null,
      'Aerospike' :null,
      'Cassandra' :null,
      'GIS' :null,
      'Hana' :null,
      'HBASE' :null,
      'Kinesis' :null,
      'Redshift' :null,
      'Amazonsqs':null,
      'Sensor Network':null,
      'Streaming Lake':null
    },
    "operation":{
      'Encryption':null,
      'Bottom':null,        
      'Aggregation':AggregationComponent, 
      'Date Time' :null,
      'Top':null,
      'Query':QueryComponent,
      'Filter':FilterComponent,
      'Formula':FormulaComponent,          
      'Find &amp; Replace':null,
      'Join':JoinComponent,
      'Merge' :null,
      'Split' :null,
      'Tag' :TagComponent,
      'Union' :UnionComponent,
      'Optimized Join' :null,
      'Rename' :null,
      'Sort' :null,
      'Wrangler':null,
      'Max':MaxComponent,
      'Min':MinComponent
    }
  }
  
  
  // showSource: boolean = false; showSourceId: string;
  // showSink: boolean = false; showSinkId: string;
  // showTop: boolean = false; showTopId: string; 
  // showCosmos: boolean = false; showCosmosId: string;
  // showFilter: boolean = false; showFilterId: string;
  // showBottom: boolean = false; showBottomId: string;
  // showQuery: boolean = false; showQueryId: string;
  // showBlobSource: boolean = false; showBlobSourceId: string;
  // showBlobSink: boolean = false; showBlobSinkId: string;
  // showCosmosSink: boolean = false; showCosmosSinkId: string;
  // showFormula: boolean = false; showFormulaId: string;
  // showAggregation: boolean = false; showAggregationId: string;
  // showJoin: boolean = false; showJoinId: string;
  executePipeline: boolean = false; executePipelineId: string;
  pipeline_id: string ='';
  componentRef:any;
  constructor(
    public router: Router, public route:ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
    ) { }

  ngOnInit() {
    console.log("PipelineDesignerComponent");
    this.pipeline_id = this.route.snapshot.paramMap.get('id');
    console.log(this.pipeline_id);
  }

  stageClicked(value){
    this.viewContainerRef.clear();
    if(value.model){
      var stageType = value.model.attributes.attrs.label.type;
      var stageName = value.model.attributes.attrs.label.text;
      if(this.childComponents[stageType]){
        if(this.childComponents[stageType][stageName]){
          var factory = this.componentFactoryResolver.resolveComponentFactory(this.childComponents[stageType][stageName]);
          this.componentRef = this.viewContainerRef.createComponent(factory);
          this.componentRef.instance.stage_id = value.model.attributes.attrs._id;
          this.componentRef.changeDetectorRef.detectChanges();
        }
      }  
    }
      
      
  }
  ngOnDestroy() {
    if(this.componentRef){
      this.componentRef.destroy(); 
    }    
   }
}
