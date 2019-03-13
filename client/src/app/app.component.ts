import { Component } from '@angular/core';
import { UsersService } from './services/user.service';
import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsersService, RolesService]
})
export class AppComponent {
  title = 'numtraPlatformV2';
}
