import { Component,Input, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { MatSnackBar } from '@angular/material';

import { DbfsService } from '../services/dbfs.service';

import { TreeComponent,TreeModel,ITreeOptions, TreeNode} from 'angular-tree-component';
import { toJS } from "mobx";





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
  selectedTreeList:any;
  nodes: any[] = [];
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this),
    useCheckbox: true,
    useTriState: true
  };

  
  
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
  getSelectedTreeNodes(tree,selectedNodes){    
    console.log(selectedNodes);
    console.log(TreeNode);
    console.log(tree);
    var selected = [];

    tree.treeModel.doForAll(function (node: TreeNode) {
      if (node.isSelected) {        
        console.log(node.id + " is selected");
        console.log(node);
      }
    });
  }

   
  ngOnInit() {
  }

}
