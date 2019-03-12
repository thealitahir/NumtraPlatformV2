import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { AuthGuard } from '../../../../src/app/guards/index';

const APP_ROUTES: Routes = [
  { path: 'platform/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'platform/roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'platform', redirectTo: 'platform/dashboard', canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
