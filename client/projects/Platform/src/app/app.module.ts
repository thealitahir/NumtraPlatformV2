import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AceModule, AceConfigInterface, ACE_CONFIG  } from 'ngx-ace-wrapper';
import {A11yModule} from '@angular/cdk/a11y';

import { TreeModule } from 'angular-tree-component';



import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatRadioModule,
  MatTableModule,
  MatSortModule,
  MatExpansionModule,
  MatOptionModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatDialogModule
} from '@angular/material';



import { routing } from './platform.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanvasComponent } from './canvas/canvas.component';
import { RolesComponent } from './roles/roles.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { ProjectFilterPipe, ApplicationFilterPipe, ModelCategoryFilterPipe } from './filter.pipe';

import { DbfsComponent } from './stages/sources/DBFS/DBFS.component';
import { CosmosDBComponent } from './stages/sources/cosmosDB/cosmosDB.component';
import { MaxComponent } from './stages/transformation/max/max.component';
import { MinComponent } from './stages/transformation/min/min.component';
import { FilterComponent } from './stages/transformation/filter/filter.component';
import { DiscoverDataComponent } from './stages/sources/discover-data-dialog/discover-data-dialog.component';
import { AddProjectComponent } from './projects/addProject-dialog/add-project-dialog.component';
import { ApplicationComponent } from './projects/application-dialog/application-dialog.component';
import { FileReadComponent } from './projects/fileRead-dialog/fileRead-dialog.component';
import { UsersService } from './services/user.service';
import { PlatRolesService } from './services/platroles.service';
import { ResourcesService } from './services/resources.service';
import { SectionsService } from './services/sections.service';
import { ComponentsService } from './services/components.service';
import { StageService } from './services/stage.service';
import { ProjectService } from './services/project.service';
import { ApplicationService } from './services/application.service';

import { PipelineDesignerComponent } from './pipeline-designer/pipeline-designer.component';

import { DbfsService } from './services/dbfs.service';
import { CosmosdbService } from './services/cosmosdb.service';
import { DbfsSinkComponent } from './stages/sinks/dbfs-sink/dbfs-sink.component';
import { DataExplorerComponent } from './data-explorer/data-explorer.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { AddStageComponent } from './stages/add-stage/add-stage.component';
import { EditStageComponent } from './stages/edit-stage/edit-stage.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
  tabSize: 2
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    CanvasComponent,
    SubNavComponent,
    RolesComponent,

    DbfsComponent,
    CosmosDBComponent,
    MaxComponent,
    MinComponent,
    FilterComponent,
    DiscoverDataComponent,
    AddProjectComponent,
    ApplicationComponent,
    FileReadComponent,

    ProjectFilterPipe,
    ApplicationFilterPipe,
    ModelCategoryFilterPipe,
    PipelineDesignerComponent,
    DbfsSinkComponent,
    DataExplorerComponent,
    FileExplorerComponent,
    AddStageComponent,
    EditStageComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    routing,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,

    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,

    MatOptionModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDialogModule,
    HttpClientModule,
    HttpModule,
    AceModule,
    A11yModule,
    TreeModule.forRoot()
  ],
  entryComponents: [ DiscoverDataComponent, AddProjectComponent, ApplicationComponent, FileReadComponent],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class PlatformSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [CosmosdbService, PlatRolesService, StageService, UsersService, ResourcesService, SectionsService, ComponentsService, DbfsService, ProjectService, ApplicationService ]
    }
  }
}
