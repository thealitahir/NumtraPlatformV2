import { Component, OnInit, ViewChild } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { NgForm } from '@angular/forms';
import { DataSourceService } from '../../services/data-source.service';
import {
  MatSnackBar,
  MatSort,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { S3BucketDialogComponent } from '../s3-bucket-dialog/s3-bucket-dialog.component';

export interface Element {
  name: string;
  type: string;
  size: string;
}

export interface OnInit {
  ngOnInit(): void;
}

const uri = 'http://localhost:7000/file/upload';
@Component({
  selector: 'app-upload',
  templateUrl: './upload-data-file.component.html',
  styleUrls: ['./upload-data-file.component.css']
})
export class UploadDataFileComponent implements OnInit {
  selectedIndex = 0;
  uploader: FileUploader = new FileUploader({ url: uri });
  attachmentList: any = [];
  files: any = [];
  name = '';
  fileType = '';
  description = '';
  datatype = '';
  problemtype = '';
  data: any;
  path = '';
  delimeter = '';
  sourceLink = '';
  error = '';
  newfiles: any;
  newdataSource: any;
  selectedFile: File = null;
  uploadres: any;
  fileheader: any;
  selectFileHeader1: any;
  selectFileHeader2: any;
  fileIdentifier: any;
  fileRel: any;
  colRel: any;
  fileRelation = [];
  createButtonDisabled: any = true;
  createRelationshipButtonDisabled: any = true;
  identifier: any;
  fileSource: any;
  selectedBucket: any;
  secretKeyType = 'password';
  profileFieldDisabled = true;
  accessKey: any;
  secretKey: any;
  profile: any;
  profileName: any;
  newS3Profile: any;
  profileId: any;
  Profile: any;
  bucketdata: any;
  bucketdataExplore: any;
  s3Path: any;
  bucketFileSelectedObj = [];
  profilesData: any;
  profiles: any;
  filespath: any = [];
  highlightedRows = [];
  paramdata: any = [];
  S3filepath: any;
  S3filename: any;
  problemslist: any;
  pParameters: any;
  probParams: any;
  S3fileindex: any;
  removeindex: any;
  problemStatus: any = 0;

  relation = { fileRel1: '', colRel1: '', fileRel2: '', colRel2: '' };

  displayedColumns: string[] = ['name', 'type', 'size'];
  dataSource = new MatTableDataSource(this.bucketdata);

  // @ViewChild(MatSort) sort: MatSort;

  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    public dataSourceService: DataSourceService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.attachmentList.push(JSON.parse(response));
    };
    this.dataSourceService.getProblems().subscribe(problems => {
      this.data = JSON.parse(problems._body);
      console.log(this.data);
      this.problemslist = this.data.data;
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.fileSource = this.route.snapshot.paramMap.get('fileSource');

    this.accessKey = '';
    this.secretKey = '';
    this.profile = '';

    this.dataSourceService.BucketProfile().subscribe(bucket => {
      console.log('=============Bucket Data=============');
      console.log(bucket);
      this.bucketdata = bucket.pathData;

      if (this.s3Path) {
        // this.bucketdataExplore = bucket.pathData;
      } else {
        this.bucketdataExplore = bucket.pathData;
      }

      this.dataSource.data = this.bucketdata;

      this.openSnackBar('SUCCESS:', 'bucket data received');
      console.log('=============this.s3Path=============');
      console.log(this.s3Path);
    });

    this.dataSourceService.getProfiles().subscribe(profilesda => {
      console.log('profiles');
      this.profiles = JSON.parse(profilesda._body);
      this.profilesData = this.profiles.data;
      console.log('========profilesData==========');
      console.log(this.profilesData);
      // this.openSnackBar('SUCCESS:', 'bucket data received');
    });

    this.dataSource.filterPredicate = (data: Element, filter: any) => {
      const searchString = JSON.parse(filter);
      if (
        data.name.toLowerCase().includes(searchString['name']) &&
        data.type.toLowerCase().includes(searchString['type'])
      ) {
        return true;
      }
      return false;
    };
  }

  getProbParameter(param) {
    this.pParameters = param;

    this.pParameters.forEach(prob => {
      this.probParams = {
        paramName: prob,
        paramValue: ''
      };
      this.paramdata.push(this.probParams);
    });
  }

  onSubmitDataSource(form: NgForm) {
    // console.log('hello');
    console.log(form);
    if (this.name === '' || this.description === '' || this.datatype === '') {
      this.error = 'Please fill all the Fields';
      this.openSnackBar('ERROR:', 'Please fill all the Fields');
    } else {
      if (this.problemtype !== '') {
        this.problemStatus = 1;
      }
      this.newdataSource = {
        name: this.name,
        description: this.description,
        datatype: this.datatype,
        path: this.files,
        relations: this.fileRelation,
        fileSource: this.fileSource,
        problemName: this.problemtype,
        problemParam: this.paramdata,
        problemStatus: this.problemStatus
      };
      console.log(this.newdataSource);
      this.dataSourceService
        .createdataSource(this.newdataSource)
        .subscribe(datasource => {
          console.log('hello data');
          console.log(datasource._body);
          this.data = JSON.parse(datasource._body);
          this.name = '';
          this.description = '';
          this.datatype = '';
          this.path = '';
          console.log('componentdatasource');
          this.router.navigate(['/data-source']);
          this.openSnackBar('Success:', 'Form submitted successfully!');
        });
    }
  }
  getHeaders(fileData) {
    console.log('headers');
    console.log(fileData);
    this.selectFileHeader1 = fileData;
  }
  getHeaders2(fileData) {
    console.log('headers');
    console.log(fileData);
    this.selectFileHeader2 = fileData;
  }
  onRelationSet() {
    this.relation = {
      fileRel1: this.relation.fileRel1,
      colRel1: this.relation.colRel1,
      fileRel2: this.relation.fileRel2,
      colRel2: this.relation.colRel2
    };
    this.fileRelation.push(this.relation);
    this.relation = { fileRel1: '', colRel1: '', fileRel2: '', colRel2: '' };
  }
  removeRelation(i) {
    this.fileRelation.splice(i, 1);
  }
  removeS3File(i) {
    console.log('delete files');
    this.removeindex = this.bucketFileSelectedObj[i].fileindex;
    this.bucketFileSelectedObj.splice(i, 1);
    this.highlightedRows.splice(
      this.highlightedRows.indexOf(this.removeindex),
      1
    );
  }
  onSourceFileSelect(event) {
    console.log('upload file event ');
    this.selectedFile = event.target.files[0];
    this.dataSourceService
      .uploadDataFile(this.selectedFile)
      .subscribe(uploadresponse => {
        this.uploadres = JSON.parse(uploadresponse._body);
        const path = '/home/adnansohail/business-first-ai-platform-dev/business-first-ai-platform/uploads/';
        // const path = '/uploads/';
        this.path = path + this.uploadres.uploadname;
        this.fileheader = this.uploadres.fileheader;
        // let data = ;
        this.identifier = this.uploadres.originalname.split('.');
        console.log(this.identifier);
        this.newfiles = {
          filepath: this.path,
          filename: this.identifier[0],
          fileType: this.fileType,
          delimeter: this.delimeter,
          fileheader: this.fileheader,
          fileIdentifier: ''
        };
        this.files.push(this.newfiles);
        this.fileType = '';
        this.delimeter = '';
        this.openSnackBar('Success:', 'File uploaded successfully!');

        if (this.files.length > 0) {
          this.createButtonDisabled = false;
        }
        if (this.files.length > 1) {
          this. createRelationshipButtonDisabled = false;
        }

        console.log('upload file ');
        console.log(this.files);
        console.log(uploadresponse);
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  // selectTab(index: number): void {
  //   this.selectedIndex = index;
  // }

  addProfile() {
    if (
      this.accessKey === '' ||
      this.secretKey === '' ||
      this.profileName === ''
    ) {
      this.error = 'Please fill all the Fields';
      this.openSnackBar('ERROR:', 'Please fill all the Fields');
    } else {
      this.profileFieldDisabled = true;
      this.newS3Profile = {
        access_key: this.accessKey,
        secret_key: this.secretKey,
        profileName: this.profileName
      };
      console.log(this.newS3Profile);
      this.dataSourceService
        .addS3Profiles(this.newS3Profile)
        .subscribe(s3ProfileResponse => {
          console.log(s3ProfileResponse);
          this.data = JSON.parse(s3ProfileResponse._body);
          this.profileId = this.data.profileId;
        });
    }
  }

  selectedProfile(profile) {
    this.accessKey = profile.access_key;
    this.secretKey = profile.secret_key;
    this.profileId = profile.profileId;
  }

  getBucket(bucketPath) {
    console.log('=============Bucket Path=============');
    console.log(bucketPath);

    this.s3Path = bucketPath;

    this.Profile = {
      profileId: this.profileId,
      // profileId: '5c127e3ab38b332751ee0a8d',
      S3path: bucketPath + '/'
    };
    console.log('=============Profiles=============');
    console.log(this.Profile);
    this.dataSourceService
      .getS3Bucket(this.Profile)
      .subscribe(s3ProfileResponse => {
        console.log('=============s3ProfileResponse=============');
        console.log(s3ProfileResponse);
        // this.selectTab(2);
      });
  }

  getBucketFile() {
    this.selectedBucket = {
      profileId: this.profileId,
      S3_path: this.bucketFileSelectedObj
      // S3_path: this.filespath
      // path: bData.path
    };
    console.log(this.selectedBucket);
    this.dataSourceService
      .getS3BucketFile(this.selectedBucket)
      .subscribe(s3readResponse => {
        console.log('s3result');
        // console.log(typeof(s3readResponse._body));
        this.data = JSON.parse(s3readResponse._body);
        this.files = this.data.header;
        //  this.identifier = this.data.filename.split('.');
        //   this.newfiles = {filename: this.data.filename ,
        //    fileType: this.data.fileType , fileheader: this.data.fileheader, fileIdentifier: ''};
        //  this.files.push(this.newfiles);
        console.log(this.files);
        // this.selectTab(3);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(S3BucketDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        dialogS3filename: this.S3filename
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.highlightedRows.pop();
      }
      if (result !== '' && result !== null) {
        this.newfiles = {
          fileindex: this.S3fileindex,
          filepath: 's3a://' + this.S3filepath,
          filename: this.S3filename,
          fileType: result.fileType,
          delimeter: result.delimeter,
          fileheader: '',
          fileIdentifier: ''
        };
        this.files.push(this.newfiles);
        this.bucketFileSelectedObj.push(this.newfiles);
        console.log(this.bucketFileSelectedObj);
        this.delimeter = '';
        this.fileType = '';
      }
      if (this.bucketFileSelectedObj.length > 0) {
        this.createButtonDisabled = false;
      }
      if (this.bucketFileSelectedObj.length > 1) {
        this.createRelationshipButtonDisabled = false;
      }
    });
  }

  bucketFileSelected(file, index) {
    if (this.highlightedRows.includes(index) === true) {
      return false;
    }

    this.S3filepath = file.path;
    this.S3filename = file.name;
    this.S3fileindex = index;
    this.highlightedRows.push(index);
    console.log(this.highlightedRows);

    this.openDialog();
  }

  S3FileSearch(name: string, type: string) {
    if (!type) {
      type = '';
    }

    this.dataSource.filter = JSON.stringify({
      name: name,
      type: type
    });
  }

  // s3selecetedfile() {
  //   this.newfiles = {filepath: this.S3filepath , filename:  this.S3filename ,
  //   fileType: this.fileType  , delimeter : this.delimeter , fileheader: '', fileIdentifier: ''};
  // this.files.push(this.newfiles);
  // this.bucketFileSelectedObj.push(this.newfiles);
  // console.log(this.bucketFileSelectedObj);
  // this.delimeter = '';
  // this.fileType = '';
  // }

  // bucketFileSelected(file, index) {
  //   this.newfiles = {filepath: file.path , filename: file.name ,
  //     fileType: this.fileType  , delimeter : this.delimeter , fileheader: this.fileheader, fileIdentifier: ''};
  //   this.files.push(this.newfiles);
  //   this.bucketFileSelectedObj.push(this.newfiles);
  //   this.highlightedRows.push(index);
  //   console.log(this.highlightedRows);
  // }
}
