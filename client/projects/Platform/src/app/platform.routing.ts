import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PipelineDesignerComponent } from './pipeline-designer/pipeline-designer.component';
import { RolesComponent } from './roles/roles.component';
import { DbfsComponent } from './stages/sources/DBFS/DBFS.component';
import { MaxComponent } from './stages/transformation/max/max.component';
import { MinComponent } from './stages/transformation/min/min.component';
import { FilterComponent } from './stages/transformation/filter/filter.component';
import { AuthGuard } from '../../../../src/app/guards/index';
import { DataExplorerComponent } from './data-explorer/data-explorer.component';
import { CosmosDBComponent } from './stages/sources/cosmosDB/cosmosDB.component';

const APP_ROUTES: Routes = [
  { path: 'platform/dbfs', component: DbfsComponent, canActivate: [AuthGuard] },
  { path: 'platform/max', component: MaxComponent },
  { path: 'platform/min', component: MinComponent },
  { path: 'platform/filter', component: FilterComponent },
  { path: 'platform/cosmosDB', component: CosmosDBComponent },
  { path: 'platform/dataExplorer', component: DataExplorerComponent },
  { path: 'platform/dashboard', component: DashboardComponent },
  { path: 'platform/canvas', component: PipelineDesignerComponent },
  { path: 'platform/roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'platform', redirectTo: 'platform/dashboard', canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
