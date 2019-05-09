import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-data-explorer',
  templateUrl: './data-explorer.component.html',
  styleUrls: ['./data-explorer.component.css']
})
export class DataExplorerComponent implements OnInit {
  @Input() dataExplorer;
  @Output() closeEvent = new EventEmitter();
  data: any ;
  facet: any ;
  selectedIndex: any = 0;
  filedata: any;
  graphFile: any;
  facetdata: any;
  protoInput: any;
  mainloader: any = 1;

  constructor(public stageService: StageService, public snackBar: MatSnackBar, private domSanitizer: DomSanitizer,) { }

  ngOnInit() {
    // this.data = {mongoObjectID: this.dataExplorer.stage_id, Sample_data_location: this.dataExplorer.file.filepath};
    // console.log(this.dataExplorer);
    this.filedata = { mongoObjectID: this.dataExplorer.stage_id, location: 'E:\\data\\sampleData\\1557210343967.csv'}
    this.data = {Sample_data: this.filedata};
    console.log(typeof(this.data));
     this.stageService.getFacetsData(this.data).subscribe(facetdata => {
      // console.log(this.data);
       console.log(facetdata);
       this.facet = facetdata.DataStats.responseList[0];
       console.log(this.facet);
       this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + this.facet.correlationPath
      );
      this.facetdata = this.facet.facets_dive;
      this.protoInput = this.facet.facets_overview;
      this.mainloader = 0;
    });
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  closeDataExplorer() {
    var dataExplorerView= 0;
    this.closeEvent.emit(dataExplorerView);
  }

}
