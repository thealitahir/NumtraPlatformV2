import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import {DataSourceService} from './services/data-source.service';
import {ModelService} from './services/models.service';

import { routing } from './BFAI.routing';

import { AppComponent } from './app.component';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatGridListModule,
  MatToolbarModule,
  MatTabsModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatExpansionModule,
  MatSelectModule,
  MatOptionModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatDialogModule
} from '@angular/material';

import { HeaderComponent } from './includes/header/header.component';
import { DashboardComponent } from './includes/dashboard/dashboard.component';
import { ModelNameFilterPipe, ModelCategoryFilterPipe } from './filter.pipe';
import { AddModelComponent } from './includes/add-model/add-model.component';
import { ModelDataSourceComponent } from './includes/model-data-source/model-data-source.component';
import { UploadDataFileComponent } from './includes/upload-data-file/upload-data-file.component';
import { FacetDataComponent } from './includes/facet-data-view/facet-data-view.component';
import { ModelComparisonComponent } from './includes/model-comparison/model-comparison.component';
import { ModelResultComponent } from './includes/modelresults/modelresult.component';
import { S3BucketDialogComponent } from './includes/s3-bucket-dialog/s3-bucket-dialog.component';
import { FeatureGraphDialogComponent } from './includes/feature-graph-dialog/feature-graph-dialog.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ModelDashboardComponent } from './includes/model-dashboard/model-dashboard.component';
import { ModelDashboardResultComponent } from './includes/model-dashboard-result/model-dashboard-result.component';
import { DataRelationComponent } from './includes/data-relation/data-relation.component';
import { DataFeaturesComponent } from './includes/data-features/data-features.component';
import { EasyPieChartDirective } from './directives/model-comparison.directive';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as GLOBAL from '../../../../src/app/global';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    AddModelComponent,
    ModelDataSourceComponent,
    UploadDataFileComponent,
    FacetDataComponent,
    ModelDashboardComponent,
    ModelDashboardResultComponent,
    DataRelationComponent,
    DataFeaturesComponent,
    ModelNameFilterPipe,
    ModelCategoryFilterPipe,
    ModelResultComponent,
    ModelComparisonComponent,
    S3BucketDialogComponent,
    EasyPieChartDirective,
    FeatureGraphDialogComponent


  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    MatSelectModule,
    MatOptionModule,

    FileUploadModule,
    HttpModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,
    SocketIoModule.forRoot(GLOBAL.SocketIoConfig),
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDialogModule,

    ChartsModule,
    NgxChartsModule

  ],
  entryComponents: [ S3BucketDialogComponent , FeatureGraphDialogComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

@NgModule({})
export class BFAISharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [ DataSourceService, ModelService ]
    }
  }
}
