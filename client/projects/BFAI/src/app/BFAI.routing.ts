import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const APP_ROUTES: Routes = [
  { path: 'BFAI/dashboard', component: DashboardComponent },
  { path: 'BFAI', redirectTo: 'BFAI/dashboard' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
