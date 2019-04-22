import { Component,Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { StageService } from '../services/stage.service';
import { MatSnackBar } from '@angular/material';
import { BlobService } from '../services/blob.service';
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
     token: '',
     domain: '',
  //   token:'dapi743e2d3cc92a32916f8c2fa9bd7d0606',
  //   domain:'https://westus.azuredatabricks.net'
   };
   childata: any;
  credentials: any;
  directories: any;
  subDirectories: any;
  selectedData: any = [];
  isSingleClick: Boolean = true;
  timer : any;
  nodes: any[] = [];
  options: ITreeOptions = {
    getChildren: this.getChildren.bind(this),
    useCheckbox: true,
    useTriState: true
  };
  blobslist: any;
  blobs: any;

  constructor(
      public stageService: StageService,
      public snackBar: MatSnackBar,
      public dbfsService : DbfsService,
      public blobService: BlobService,
    ) {

   }

   ngOnInit() {
    console.log(this.fileExplorer);
    if (this.fileExplorer.type === 'blobStorage') {
      console.log('blobstorage');
      this.data = this.fileExplorer.cred;
        // this.openSnackBar('SUCCESS:', 'Rrequested sample data.');
        this.blobService.getContainers(this.data).subscribe(data => {
          console.log(data);
          const containerslist = data[0].Container;
          console.log(containerslist);
          var array=[];
          for (let i = 0 ; i < containerslist.length; i++) {
            const obj = {name: containerslist[i].Name[0] , path: '/' + containerslist[i].Name, hasChildren: true };
            array.push(obj);

          }
          this.nodes = array;
          console.log(this.nodes);
        });
      }

    if (this.fileExplorer.type === 'Dbfs') {
      this.data = this.fileExplorer.cred;
      this.selectedData = [];
      this.timer = 0;
      this.dbfsService.getDataFiles({token: this.data.token , domain: this.data.domain,path:'/'}).subscribe(data => {
        this.directories = data.files;
        this.nodes = data.files;
        console.log(this.nodes);
      });
    }
  }

  getChildren(node: TreeNode) {
    return new Promise((resolve, reject) => {
      if (this.fileExplorer.type === 'blobStorage') {
          console.log(node.data);
          this.childata = {accountName: this.data.accountName, accountKey: this.data.accountKey, container: node.data.name };
          //this.openSnackBar('SUCCESS:', 'Rrequested sample data.');
          this.blobService.getBlobsList(this.childata).subscribe(data => {
            this.blobslist = data[0].Blob;
            var blobs = [];
            for (let i = 0 ; i < this.blobslist.length; i++) {
              const bname = this.blobslist[i].Name[0];
              if ( !bname.includes('/')) {
                blobs.push({name: bname, path: node.data.name + '/' + this.blobslist[i].Name, hasChildren: false});
              }
              // const obj = {name: this.blobslist[i].Name , path: '/' + this.blobslist[i].Name, hasChildren: true };
              //this.nodes.push(obj);
            }
            for (let i = 0 ; i < blobs.length; i++) {
              const blobname = blobs[i].name;
              for (let j = 0 ; j < this.blobslist.length; j++) {
                const bname = this.blobslist[j].Name[0];
                if ( bname.includes(blobname + '/')) {
                  blobs[i].hasChildren = true;
                  const obj = {name: this.blobslist[j].Name[0] , path:'/' + node.data.name + '/' + this.blobslist[j].Name[0], hasChildren: false };
                  blobs[i].children = [];
                  blobs[i].children.push(obj);
                }
              }
            }
            console.log(blobs);
            resolve(blobs);
            //this.stage.stage_attributes.url = this.stage.stage_attributes.accountname + '/' + this.stage.stage_attributes.containername;
          });



      }
      if (this.fileExplorer.type === 'Dbfs') {
        this.dbfsService.getDataFiles({token: this.data.token , domain: this.data.domain,path:node.data.path}).subscribe(data => {
          resolve(data.files)
        });
      }
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
      console.log(this.selectedData);
      for(var i=0;i<this.selectedData.length;i++){
        var pathExists = this.checkPathExists(this.selectedData,this.selectedData[i].path,this.selectedData[i].id);
        if(!pathExists){
          parsedSelected.push({
            path:this.selectedData[i].path,
            name:this.selectedData[i].name
          });
        }
      }
      console.log(parsedSelected);
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



}
