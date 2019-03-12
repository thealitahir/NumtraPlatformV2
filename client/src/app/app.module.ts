import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip'
import {
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatToolbarModule,
  MatTabsModule,
} from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './guards/index';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SelectApplicationComponent } from './select-application/select-application.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectApplicationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,

    MatCheckboxModule,
    MatIconModule,

    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
