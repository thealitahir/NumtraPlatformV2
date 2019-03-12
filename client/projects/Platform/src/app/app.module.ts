import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip'
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatInputModule,
  MatCardModule,
} from '@angular/material';

import { routing } from './platform.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { SubNavComponent } from './sub-nav/sub-nav.component';
import { ProjectFilterPipe, ApplicationFilterPipe, ModelCategoryFilterPipe } from './filter.pipe';

import { UsersService } from './services/user.service';
import { PlatRolesService } from './services/platroles.service';
import { ResourcesService } from './services/resources.service';
import { SectionsService } from './services/sections.service';
import { ComponentsService } from './services/components.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    SubNavComponent,
    RolesComponent,

    ProjectFilterPipe,
    ApplicationFilterPipe,
    ModelCategoryFilterPipe

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

    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class PlatformSharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [ PlatRolesService , UsersService, ResourcesService, SectionsService, ComponentsService ]
    }
  }
}
