import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './includes/dashboard/dashboard.component';
import { AddModelComponent } from './includes/add-model/add-model.component';
import { ModelDataSourceComponent } from './includes/model-data-source/model-data-source.component';
import { UploadDataFileComponent } from './includes/upload-data-file/upload-data-file.component';
import { FacetDataComponent } from './includes/facet-data-view/facet-data-view.component';
import { ModelComparisonComponent } from './includes/model-comparison/model-comparison.component';
import { ModelResultComponent } from './includes/modelresults/modelresult.component';
import { ModelDashboardComponent } from './includes/model-dashboard/model-dashboard.component';
import { ModelDashboardResultComponent } from './includes/model-dashboard-result/model-dashboard-result.component';
import { DataRelationComponent } from './includes/data-relation/data-relation.component';
import { DataFeaturesComponent } from './includes/data-features/data-features.component';
import { AuthGuard } from '../../../../src/app/guards/index';

const APP_ROUTES: Routes = [
  { path: 'BFAI/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/add-model', component: AddModelComponent , canActivate: [AuthGuard] },
  { path: 'BFAI/data-source', component: ModelDataSourceComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/upload-data-file/:fileSource', component: UploadDataFileComponent, canActivate: [AuthGuard]},
  { path: 'BFAI/data-source-details/:id', component: FacetDataComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/model-comparison/:id/:index', component: ModelComparisonComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/model-Result', component: ModelResultComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/model-dashboard', component: ModelDashboardComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/model-dashboard-result/:id', component: ModelDashboardResultComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/data-relation/:id', component: DataRelationComponent, canActivate: [AuthGuard] },
  { path: 'BFAI/data-features/:entity' , component: DataFeaturesComponent, canActivate: [AuthGuard] },
  { path: 'BFAI', redirectTo: 'BFAI/dashboard' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
