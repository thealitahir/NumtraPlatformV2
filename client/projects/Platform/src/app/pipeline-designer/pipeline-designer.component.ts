import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipeline-designer',
  templateUrl: './pipeline-designer.component.html',
  styleUrls: ['./pipeline-designer.component.css']
})
export class PipelineDesignerComponent implements OnInit {

  showStage: boolean = false;
  constructor() { }

  ngOnInit() {
    console.log("PipelineDesignerComponent");
  }

  stageClicked(value){
    console.log(value);
    if(value && !this.showStage)
      this.showStage = true;
    else if(value && this.showStage)
      this.showStage = false;
  }

}
