import { Component,Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { MatSnackBar } from '@angular/material';

import { DbfsService } from '../services/dbfs.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {
  data: any ={
    token:'dapi743e2d3cc92a32916f8c2fa9bd7d0606',
    domain:'https://westus.azuredatabricks.net'
  };
  directories:any;
  subDirectories:any;
  selectedData:any = [];
  isSingleClick: Boolean = true;
  timer : any;
  

  constructor(
      public stageService: StageService,
      public snackBar: MatSnackBar,
      public dbfsService : DbfsService
    ) {
      this.selectedData = [];
      this.timer = 0;
      this.dbfsService.getDataFiles({token: this.data.token , domain: this.data.domain,path:'/'}).subscribe(data => {
        this.directories = data.files;
      });
   }
   doubleClickFolder(object){
    this.isSingleClick = false;    
    this.getSubFoldersAndFiles(object);
    clearTimeout(this.timer);
   }
   getSubFoldersAndFiles(object){ 
     if(object.is_dir){
      this.dbfsService.getDataFiles({token: this.data.token , domain: this.data.domain,path:object.path}).subscribe(data => {
        object.children = data.files;
      });  
     }          
   }
   selectFolderOrFile(object){
      this.isSingleClick = true;
      this.timer = setTimeout(() => {
        if(this.isSingleClick){
          var selected = this.selectedData;
            selected.push(object);
            this.selectedData = selected;
        }
      }, 250); 
   }
   
  ngOnInit() {
  }

}
