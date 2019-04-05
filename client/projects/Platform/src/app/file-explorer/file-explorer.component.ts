import { Component,Input, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { MatSnackBar } from '@angular/material';

import { DbfsService } from '../services/dbfs.service';

import { ITreeOptions, TreeNode} from 'angular-tree-component';




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


  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this),
    useCheckbox: true,
    useTriState: true
  };

  

  nodes: any[] = [];

  asyncChildren = [
    {
      name: 'child1',
      hasChildren: true
    }, {
      name: 'child2'
    }
  ];
  
  
  constructor(
      public stageService: StageService,
      public snackBar: MatSnackBar,
      public dbfsService : DbfsService
    ) {
      this.selectedData = [];
      this.timer = 0;
      this.dbfsService.getDataFiles({token: this.data.token , domain: this.data.domain,path:'/'}).subscribe(data => {
        this.directories = data.files;
        this.nodes = data.files;
      });

      
   }
   getChildren(node: TreeNode) {
     console.log(node);
     console.log(node.data);
    return new Promise((resolve, reject) => {
      this.dbfsService.getDataFiles({token: this.data.token , domain: this.data.domain,path:node.data.path}).subscribe(data => {
        resolve(data.files)
      });
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
