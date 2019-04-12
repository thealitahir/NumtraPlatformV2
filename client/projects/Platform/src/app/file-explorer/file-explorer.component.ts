import { Component,Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { MatSnackBar } from '@angular/material';

import { DbfsService } from '../services/dbfs.service';

import { TreeComponent,TreeModel,ITreeOptions, TreeNode} from 'angular-tree-component';
import { toJS } from "mobx";

export interface SelectedTreeNodes {
  name: string;
  id: any;
  path: string
}



@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})
export class FileExplorerComponent implements OnInit {
  @Input() fileExplorer;
  @Output() selectedNodesEvent = new EventEmitter();

  selectedTreeNodes: SelectedTreeNodes[] = [];
  data: any ={
    token:'dapi743e2d3cc92a32916f8c2fa9bd7d0606',
    domain:'https://westus.azuredatabricks.net'
  };
  credentials:any;
  directories:any;
  subDirectories:any;
  selectedData:any = [];
  isSingleClick: Boolean = true;
  timer : any;  
  nodes: any[] = [];
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this),
    useCheckbox: true,
    useTriState: true
  };

  c
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
    return new Promise((resolve, reject) => {
      this.dbfsService.getDataFiles({token: this.data.token , domain: this.data.domain,path:node.data.path}).subscribe(data => {
        resolve(data.files)
      });
    });
  }
  getSelectedTreeNodes(tree){    
    var selected = new Array();
    var parsedSelected = [];
    tree.treeModel.doForAll(function (node: TreeNode) {
      if (node.isSelected) {
        var obj = {
          path:node.data.path,
          name:node.data.name,
          id:node.data.id
        }
        selected.push(obj);
      }
    });


    setTimeout(() => {
      this.selectedData = selected;
      for(var i=0;i<this.selectedData.length;i++){
        var pathExists = this.checkPathExists(this.selectedData,this.selectedData[i].path,this.selectedData[i].id);
        if(!pathExists){
          parsedSelected.push({
            path:this.selectedData[i].path,
            name:this.selectedData[i].name
          });
        }
      }
      this.selectedNodesEvent.emit(parsedSelected);


    }, 100);
  }
  checkPathExists(data,path,id){
    for(var n=0;n<data.length;n++){
      if(id !== data[n].id){
        if(data[n].path.indexOf(path) != -1){
          return true;
          
        }
      }
    }
    return false;
  }
   
  ngOnInit() {
  }

}
