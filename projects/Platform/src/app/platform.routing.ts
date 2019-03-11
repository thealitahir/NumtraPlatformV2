import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const APP_ROUTES: Routes = [
  { path: 'platform/dashboard', component: DashboardComponent },
  { path: 'platform', redirectTo: 'platform/dashboard' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
