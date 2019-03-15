import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanvasComponent } from './canvas/canvas.component';
import { RolesComponent } from './roles/roles.component';
import { DbfsComponent } from './stages/sources/DBFS/DBFS.component';
import { AuthGuard } from '../../../../src/app/guards/index';

const APP_ROUTES: Routes = [
  { path: 'platform/dbfs', component: DbfsComponent, canActivate: [AuthGuard] },
  { path: 'platform/dashboard', component: DashboardComponent },
  { path: 'platform/canvas', component: CanvasComponent },
  { path: 'platform/roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'platform', redirectTo: 'platform/dashboard', canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
