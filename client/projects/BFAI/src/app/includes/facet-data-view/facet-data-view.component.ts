import { Component, OnInit, ElementRef } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataSourceService } from '../../services/data-source.service';
import { MatSnackBar, MatTableDataSource , MatDialog } from '@angular/material';
import { stringify } from 'querystring';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ng-socket-io';
import { DomSanitizer } from '@angular/platform-browser';
import { validateBasis } from '@angular/flex-layout';
import { FeatureGraphDialogComponent } from '../feature-graph-dialog/feature-graph-dialog.component';

@Component({
  selector: 'app-facet',
  templateUrl: './facet-data-view.component.html',
  styleUrls: ['./facet-data-view.component.css']
})
export class FacetDataComponent implements OnInit {
  datasources: any;
  datasourceslabel: any;
  datasourcesfeature: any;
  features = [];
  newfeature = {};
  datasourceid = '';
  datasourcelocation = '';
  transformeddata = {};
  featureResponse = '';
  transformedfeatures = [];
  selectedIndex = 0;
  protoInput = {};
  facetdata = {};
  tfd_status: any;
  selectAll: any = true;
  selectAllTrans: any = true;
  tfd_label = '';
  error = '';
  notify = '';
  loader = 0;
  graphFileNameUrl: any;
  dataSourcetable: any;
  base64string: any;
  displayedColumns: string[] = [
    'select',
    'No',
    'Feature',
    'Type',
    'Transformation'
  ];
  mainloader = 0;
  filepath: any;
  featuresStat: any = [];
  dataset = {};
  graphFile: any;
  dataSourceSet = [];
  featurestr = '';
  schemastr = '';
  schema = [];
  featuresdata = [];
  entityFeature = [];
  entityLabel = [];
  dataindex: any;
  fdata: any;
  feature: any;
  featuresdataset: any;
  graphdata: any = [];
  gdata: any = {};
  graphKeys = [];
  relFeatureStatus: any = 0;
  relLabelStatus: any = 0;
  relfeaturesdata = [];
  val: any;
  relfeatureIndex: any = '';
  graphWidth: any = 80;
  grapLabelhWidth: any = 20;
  fullGraph = false;
  code: any;
  relLabeldata: any = [] ;
  labelsdataset: any;
  ldata: any;
  fileSource: any;
  problemStatus: any;
  labelFilePath: any;

  constructor(
    public dataSourceService: DataSourceService,
    private domSanitizer: DomSanitizer,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private socket: Socket
  ) {
    this.mainloader = 1;
    const idparam = this.route.snapshot.paramMap.get('id');
    console.log(idparam);
    this.dataSourceService.getdataSource(idparam).subscribe(datasource => {
     // console.log(datasource._body);
      this.datasources = JSON.parse(datasource._body);
      // console.log(this.datasources);
      this.datasourceid = this.datasources.data._id;
      this.featuresStat = this.datasources.data.Features_Stat;
      this.fileSource = this.datasources.data.fileSource;
      this.problemStatus = this.datasources.data.problemStatus;
      this.labelFilePath = this.datasources.data.labelFilePath;
      console.log('read label file');
      console.log(this.labelFilePath + ' , ' + this.problemStatus);
      if (this.problemStatus === '1' ) {
        console.log('read label file');
        this.feature = { filepath: this.labelFilePath };
        // this.feature = { filepath: 'churnLabels.csv' };
        console.log(this.feature);
        this.dataSourceService.getdataFeatures(this.feature).subscribe(dataSrcLabel => {
          console.log(dataSrcLabel);
          this.relLabelStatus = 1;
          this.labelsdataset = JSON.parse(dataSrcLabel._body);
          this.ldata = this.labelsdataset.filedata;
          this.graphdata = this.ldata.slice(0, 30);
          console.log('array slice');
          console.log(this.graphdata);
          this.graphKeys = Object.keys(this.graphdata[0]);
          this.graphKeys.forEach(key => {
            this.gdata[key] = [];
          });
          console.log('graph array');
          console.log(this.graphKeys);
          this.graphKeys.forEach((feature, index) => {
            this.newfeature = {
              Label: feature,
              checked: true,
            };
            this.relLabeldata.push(this.newfeature);
          });

          console.log(this.relLabeldata);

          this.graphdata.forEach((obj, index) => {
            this.graphKeys.forEach(key => {
              if (obj[key] !== '') {
                this.val = obj[key];
              } else {
                this.val = '0';
              }
              this.gdata[key].push({
                name: index + 1,
                value: this.val
              });
            });
          });

          if (this.labelsdataset.filedata.length > 0) {
            console.log('entity');
              this.dataset = {
                Label: this.relLabeldata,
                relLabel: 1,
                Labelstatus: 1,
                fileSource: this.fileSource,
                dataSrc_status: this.datasources.data.dataSrc_status
              };
              this.dataSourceSet[0].Labelstatus = 1 ;
              this.dataSourceSet.push(this.dataset);
              console.log(this.dataSourceSet);
          }
        });
      }

      console.log(this.featuresStat);

      this.tfd_status = this.datasources.data.tfd_status;

      // this.graphFileNameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.base64string);
      this.featuresStat.forEach((feat, ii) => {
        // this.featurestr = feat.features;
        this.features = feat.features;
        // this.schemastr = feat.schema.replace(/'/g, ''');
        this.schema = feat.schema;
        this.features.forEach((feature, index) => {
          this.newfeature = {
            feature: feature,
            checked: true,
            transformation: '',
            type: this.schema[index]
          };
          if (this.schema[index] === 'string') {
            this.newfeature['transformation'] = 'Bag of Words';
          }
          this.featuresdata.push(this.newfeature);
        });
        this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + feat.correlationPath
        );

        this.dataset = {
          facetdata: feat.facets_dive,
          graphFileNameUrl: this.graphFile,
          protoInput: feat.facets_overview,
          features: this.featuresdata,
          relFeature: 0,
          Labelstatus: 0,
          filename: feat.filename,
          filePath: feat.filePath,
          fileSource: this.fileSource,
          featureindex: ii,
          metadata: feat.metadata,
          tfd_status: feat.tfd_status,
          dataSrc_status: this.datasources.data.dataSrc_status
        };
        this.featuresdata = [];
        this.dataSourceSet.push(this.dataset);
      });
      if (this.datasources.data.entity_features.length > 0) {
        console.log('entity');
        this.entityFeature = this.datasources.data.entity_features;
        console.log(this.entityFeature);
        this.entityFeature.forEach((entityfeat, eindex) => {
          this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + entityfeat.Entity_correlation
          );
          this.dataset = {
            graphFileNameUrl: this.graphFile,
            corelfeatures: entityfeat.coRelFeatures,
            features: entityfeat.Features,
            relFeature: 1,
            filename: entityfeat.Entity,
            filePath: entityfeat.Sample_path,
            fileSource: this.fileSource,
            featureindex: eindex,
            mainfilePath: entityfeat.mainFile_Path,
            schema: entityfeat.schema,
            dataSrc_status: this.datasources.data.dataSrc_status
          };
          this.dataSourceSet.push(this.dataset);
        });
        //  this.dataSourceSet.push(this.dataset);
      }
      this.mainloader = 0;
      console.log(this.dataSourceSet);
    });
  }

  view: any[] = [150, 100];
  showXAxis = true;
  xAxisTicks = [1, 50];
  colorScheme = {
    domain: ['#3f51b5']
  };

  // constructor(public dataSourceService: DataSourceService, private domSanitizer: DomSanitizer,
  //    public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router , private socket: Socket) {
  //   this.mainloader = 1;
  //   const idparam = this.route.snapshot.paramMap.get('id');
  //   console.log(idparam);
  //     this.dataSourceService.getdataSource(idparam).subscribe(datasource => {

  //   this.datasources = JSON.parse(datasource._body);
  //   this.datasourceid = this.datasources.data._id;
  //   this.datasourcelocation = this.datasources.data.locationMerged;
  //   this.protoInput = this.datasources.data.facets_overview;
  //   this.facetdata = this.datasources.data.facets_dive;
  //   this.tfd_status = this.datasources.data.tfd_status;

  //   this.base64string = this.datasources.data.correlationPath;
  //   this.graphFileNameUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.base64string);
  //   // this.graphFileNameUrl = 'assets/coorelations/' +  this.datasources.data.correlationPath;
  //   // this.graphFileNameUrl = 'assets/coorelations/IRISdata1542704437000_Correlation.png';

  //   this.datasources.data.features.forEach( (feature , index) => {
  //     this.newfeature = {feature: feature, checked: true  , transformation : '', type: this.datasources.data.schema[index]};
  //     if (this.datasources.data.schema[index] === 'string') {
  //       this.newfeature['transformation'] = 'Bag of Words';
  //     }
  //     this.features.push(this.newfeature);
  //   });
  //   this.mainloader = 0;
  //   console.log(this.datasources);
  //   });
  // }

  openDialog(featuredata, feature): void {
    const dialogRef = this.dialog.open(FeatureGraphDialogComponent, {
      width: '900px',
      disableClose: true,
      data: {
        dialogfeature: feature,
        dialogfdata: featuredata
      }
    });
  }

  ngOnInit() {
    this.socket.on('ontransnotify', data => {
      console.log(data);
    });

    const idparam = this.route.snapshot.paramMap.get('id');
    this.dataSourceService.getTransFeatures(idparam).subscribe(transfeature => {
      console.log(transfeature);
      this.transformedfeatures = transfeature.MongoData;
      this.datasourceid = transfeature.mongo_id;
      this.tfd_status = transfeature.tfd_status;
      this.dataindex = transfeature.dataIndex;
      this.dataSourcetable = new MatTableDataSource(this.transformedfeatures);
      this.loader = 0;
      console.log(transfeature.message);
      console.log(transfeature.MongoData);

      this.openSnackBar('SUCCESS:', transfeature.message);
    });

    this.dataSourceService.getModelNotify(idparam).subscribe(modelnotify => {
      this.notify = modelnotify.message;
      // this.datasourceid = transfeature.mongo_id;
      // this.tfd_status = transfeature.tfd_status;
      console.log('model notify angular');
      console.log(modelnotify);
      // console.log(transfeature.MongoData);

      this.openSnackBar('SUCCESS:', modelnotify.message);
      //  this.router.navigate([
      //    '/model-comparison/' +
      //      modelnotify.mongo_id +
      //      '/' +
      //      modelnotify.dataIndex
      //  ]);
    });

    this.dataSourceService.loadDataSrcLabel(idparam).subscribe(dataSrcLabel => {
      this.notify = dataSrcLabel.message;
      this.datasourceslabel = dataSrcLabel;
      console.log('load Data src Label');
      console.log(dataSrcLabel);
      this.loader = 1;
    this.relfeaturesdata = [];
    this.relLabelStatus = 1;
    // this.feature = { filepath: dSet.filePath };
    // this.feature = { filepath: '1548415581269.1548414915538transactionstransactions.csv' };

        // this.labelsdataset = JSON.parse(dataSrcLabel);
        this.labelsdataset = dataSrcLabel;
        this.ldata = this.labelsdataset.filedata;
        // this.relfeatureIndex = dSet.featureindex;
        // this.datasourceid = this.datasources.data._id;
        // this.datasourcelocation = this.datasources.data.locationMerged;
        // this.features = this.datasources.data.entity_features;
        //  console.log(this.fdata);
        this.graphdata = this.ldata.slice(0, 100);
        console.log('array slice');
        console.log(this.graphdata);
        this.graphKeys = Object.keys(this.graphdata[0]);
        this.graphKeys.forEach(key => {
          this.gdata[key] = [];
        });
        console.log('graph array');
        console.log(this.graphKeys);
        this.graphKeys.forEach((feature, index) => {
          this.newfeature = {
            Label: feature,
            checked: true,
          };
          this.relLabeldata.push(this.newfeature);
        });

        console.log(this.relLabeldata);

        this.graphdata.forEach((obj, index) => {
          this.graphKeys.forEach(key => {
            if (obj[key] !== '') {
              this.val = obj[key];
            } else {
              this.val = '0';
            }
            this.gdata[key].push({
              name: index + 1,
              value: this.val
            });
          });
        });

        if (this.datasourceslabel.filedata.length > 0) {
          console.log('entity');
         // this.entityLabel = this.datasourceslabel.Labels;
         // console.log(this.entityLabel);
          // this.entityLabel.forEach((entityfeat, eindex) => {
            this.dataset = {
              // graphFileNameUrl: this.graphFile,
              // corelfeatures: entityfeat.coRelFeatures,
               Label: this.relLabeldata,
               relLabel: 1,
              fileSource: this.fileSource,
              // filename: entityfeat.Entity,
              // filePath: entityfeat.Sample_path,
              // featureindex: eindex,
              // mainfilePath: entityfeat.mainFile_Path,
              // schema: entityfeat.schema,
               dataSrc_status: this.datasourceslabel.labeldata.dataSrc_status
            };
            this.dataSourceSet[0].dataSrc_status = this.datasourceslabel.labeldata.dataSrc_status;
            this.dataSourceSet.push(this.dataset);
         // });
          //  this.dataSourceSet.push(this.dataset);
        }
        console.log(this.dataSourceSet);
        console.log('graph array');

        console.log(this.gdata);
        this.loader = 0;

     // this.openSnackBar('SUCCESS:', dataSrcLabel.message);
    });

    this.dataSourceService.loadDataSrcRem(idparam).subscribe(datasource => {

      console.log(datasource);
      this.datasources = datasource;
      console.log(this.datasources);
      if (this.datasources.entity_features.length > 0) {
        console.log('entity');
        this.entityFeature = this.datasources.entity_features;
        console.log(this.entityFeature);
        this.entityFeature.forEach((entityfeat, eindex) => {
          this.graphFile = this.domSanitizer.bypassSecurityTrustResourceUrl(
            'data:image/jpg;base64,' + entityfeat.Entity_correlation
          );
          this.dataset = {
            graphFileNameUrl: this.graphFile,
            corelfeatures: entityfeat.coRelFeatures,
            features: entityfeat.Features,
            relFeature: 1,
            filename: entityfeat.Entity,
            filePath: entityfeat.Sample_path,
            fileSource: this.fileSource,
            featureindex: eindex,
            mainfilePath: entityfeat.mainFile_Path,
            schema: entityfeat.schema,
            dataSrc_status: this.datasources.dataSrc_status
          };
          this.dataSourceSet[0].dataSrc_status = this.datasources.dataSrc_status;
          this.dataSourceSet.push(this.dataset);
        });
      }
      this.mainloader = 0;
      console.log(this.dataSourceSet);
    });


    // this.dataSourceService.getCorelationGraph().subscribe(resGraphData => {
    //   this.grapgData = resGraphData._body;

    //   this.matches = this.grapgData.match(/<div[\s\S]*?>[\s\S]*?<\/div>/gi)[0];

    //   this.graphId = this.matches.match(/\d+/)[0];

    //   console.log('*** Graph Data ***');
    //   // console.log(this.grapgData);
    //   console.log(this.graphId);

    //   this.graphFileName = 'plot_iris.png';
    //   this.graphFileNameUrl = 'http://localhost:3000/src/assets/graphData/' + this.graphFileName;

    //   // const s = document.createElement('link');
    //   // s.rel = 'import';
    //   // s.href =
    //   //   'http://localhost:3000/src/assets/graphData/' + this.graphFileName;
    //   // this.elementRef.nativeElement.appendChild(s);
    // });
  }

  datafeatures(dSet) {
    this.loader = 1;
    this.relfeaturesdata = [];
    this.relFeatureStatus = 1;
    this.feature = { filepath: dSet.filePath };
    // this.feature = { filepath: '1548415581269.1548414915538transactionstransactions.csv' };
    console.log(this.feature);
    this.dataSourceService
      .getdataFeatures(this.feature)
      .subscribe(datasource => {
        console.log(datasource);
        this.featuresdataset = JSON.parse(datasource._body);
        this.fdata = this.featuresdataset.filedata;
        this.relfeatureIndex = dSet.featureindex;
        // this.datasourceid = this.datasources.data._id;
        // this.datasourcelocation = this.datasources.data.locationMerged;
        // this.features = this.datasources.data.entity_features;
        //  console.log(this.fdata);
        this.graphdata = this.fdata.slice(0, 100);
        console.log('array slice');
        console.log(this.graphdata);
        this.graphKeys = Object.keys(this.graphdata[0]);
        this.graphKeys.forEach(key => {
          this.gdata[key] = [];
        });
        console.log('graph array');
        console.log(this.graphKeys);
        this.graphKeys.forEach((feature, index) => {
          this.newfeature = {
            feature: feature,
            checked: true,
            transformation: '',
            type: dSet.schema[index]
          };
          if (dSet.schema[index] === 'string') {
            this.newfeature['transformation'] = 'Bag of Words';
          }
          this.relfeaturesdata.push(this.newfeature);
        });

        console.log(this.relfeaturesdata);

        this.graphdata.forEach((obj, index) => {
          this.graphKeys.forEach(key => {
            if (obj[key] !== '') {
              this.val = obj[key];
            } else {
              this.val = '0';
            }
            this.gdata[key].push({
              name: index + 1,
              value: this.val
            });
          });
        });
        console.log('graph array');
        console.log(this.gdata);
        this.loader = 0;
      });
  }

  onRelationDataFeatures(dSet) {
    if (this.tfd_label === '') {
      this.error = 'Please fill all the Fields';
      this.openSnackBar('ERROR:', 'Please fill all the Fields');
    } else {
      this.relfeaturesdata.forEach(feature => {
       // console.log(feature);
        if (feature.feature === this.tfd_label) {
          feature.checked = false;
        }
      });
      this.transformeddata = {
        mongo_id: this.datasourceid,
        transformed: this.relfeaturesdata,
        location: dSet.mainfilePath,
        label: this.tfd_label,
        dataIndex: dSet.featureindex,
        fileSource: dSet.fileSource
      };
      this.router.navigate([
        '/model-comparison/' +
        this.datasourceid +
          '/' +
          dSet.featureindex
      ]);
      this.dataSourceService
        .relationFeatures(this.transformeddata)
        .subscribe(datasource => {
          console.log('hello data');
          console.log(datasource._body);
          this.featureResponse = JSON.parse(datasource._body);

          this.openSnackBar('SUCCESS:', 'Form submit successfully.');
          console.log('feature response');
          console.log(this.featureResponse);
        });
    }
  }

  checkAll() {
    this.features.forEach(feature => {
      console.log(feature);
      feature.checked = this.selectAll;
    });
    console.log(this.features);
  }

  checkTransAll() {
    this.transformedfeatures.forEach(feature => {
      console.log(feature);
      feature.checked = this.selectAllTrans;
    });
    console.log(this.features);
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
  }

  onSubmitDataFeatures(dataset) {
    console.log('features form');
    console.log(dataset);
    console.log(this.features);
    console.log(this.datasourceid);
    console.log(this.datasourcelocation);
    this.loader = 1;
    this.transformeddata = {
      mongo_id: this.datasourceid,
      transformed: dataset.features,
      dataIndex: dataset.featureindex,
      location: dataset.filePath,
      metadata: dataset.metadata,
      fileSource: dataset.fileSource
    };
    console.log(this.transformeddata);
    this.dataSourceService
      .adddataSourceFeatures(this.transformeddata)
      .subscribe(datasource => {
        console.log('hello data');
        console.log(datasource._body);
        this.featureResponse = JSON.parse(datasource._body);

        this.openSnackBar('SUCCESS:', 'Form submit successfully.');
        console.log('feature response');
        console.log(this.featureResponse);
        // this.router.navigate(['/model-Result']);
      });
  }

  // onSubmitDataFeatures(form: NgForm) {
  //   console.log('features form');
  //   console.log(this.features);
  //   console.log(this.datasourceid);
  //   console.log(this.datasourcelocation);
  //   this.loader = 1;
  //   this.transformeddata = {
  //     mongo_id: this.datasourceid,
  //     transformed: this.features,
  //     location: this.datasourcelocation
  //   };
  //   this.dataSourceService.adddataSourceFeatures(this.transformeddata).subscribe(datasource => {
  //       console.log('hello data');
  //       console.log(datasource._body);
  //       this.featureResponse = JSON.parse(datasource._body);

  //       this.openSnackBar('SUCCESS:', 'Form submit successfully.');
  //       console.log('feature response');
  //       console.log(this.featureResponse);
  //       // this.router.navigate(['/model-Result']);
  //     });
  // }

  onSubmitTransFeatures(form: NgForm) {
    console.log('features form');
    console.log(this.transformedfeatures);
    console.log(this.datasourceid);
    console.log(this.tfd_label);
    if (this.tfd_label === '') {
      this.error = 'Please fill all the Fields';
      this.openSnackBar('ERROR:', 'Please fill all the Fields');
    } else {
      this.transformedfeatures.forEach(feature => {
        console.log(feature);
        if (feature.feature === this.tfd_label) {
          feature.checked = false;
        }
      });
      console.log('after');
      console.log(this.transformedfeatures);
      this.transformeddata = {
        mongo_id: this.datasourceid,
        transformed: this.transformedfeatures,
        label: this.tfd_label,
        dataIndex: this.dataindex
      };
      this.router.navigate([
        '/model-comparison/' +
        this.datasourceid +
          '/' +
          this.dataindex
      ]);
      this.dataSourceService
        .addTransFeatures(this.transformeddata)
        .subscribe(datasource => {
          console.log('hello data');
          console.log(datasource._body);
          this.featureResponse = JSON.parse(datasource._body);

          this.openSnackBar('SUCCESS:', 'Form submit successfully.');
          console.log('feature response');
          console.log(this.featureResponse);
          // this.router.navigate(['/model-Result']);
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  labelFullWidth() {
    this.graphWidth = 50;
    this.grapLabelhWidth = 50;
    this.fullGraph = true;
  }
  graphFullWidth() {
    this.graphWidth = 80;
    this.grapLabelhWidth = 20;
    this.fullGraph = false;
  }
}
