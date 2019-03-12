import { Component } from '@angular/core';
import { UsersService } from './services/user.service';
import { RolesService } from './services/roles.service';
import { ResourcesService } from './services/resources.service';
import { SectionsService } from './services/sections.service';
import { ComponentsService } from './services/components.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsersService, RolesService, ResourcesService, SectionsService, ComponentsService ]
})
export class AppComponent {
  title = 'numtraPlatformV2';
}
