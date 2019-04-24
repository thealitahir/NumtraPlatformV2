import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PipelineDesignerComponent } from './pipeline-designer/pipeline-designer.component';
import { RolesComponent } from './roles/roles.component';
import { DbfsComponent } from './stages/sources/DBFS/DBFS.component';
import { MaxComponent } from './stages/transformation/max/max.component';
import { AggregationComponent } from './stages/transformation/aggregation/aggregation.component';
import { QueryComponent } from './stages/transformation/query/query.component';
import { FilterComponent } from './stages/transformation/filter/filter.component';
import { FormulaComponent } from './stages/transformation/formula/formula.component';
import { AuthGuard } from '../../../../src/app/guards/index';
import { DataExplorerComponent } from './data-explorer/data-explorer.component';
import { CosmosDBComponent } from './stages/sources/cosmosDB/cosmosDB.component';
import { BlobStorageComponent } from './stages/sources/blob-storage/blob-storage.component';
import { BlobStorageSinkComponent } from './stages/sinks/blob-storage-sink/blob-storage-sink.component';
import { CosmosDBSinkComponent } from './stages/sinks/cosmosDB-sink/cosmosDB-sink.component';
import { AddStageComponent } from './stages/add-stage/add-stage.component';
import { EditStageComponent } from './stages/edit-stage/edit-stage.component';
import { ShowStageComponent } from './stages/show-stage/show-stage.component';

import { from } from 'rxjs';
const APP_ROUTES: Routes = [
  { path: 'platform/dbfs', component: DbfsComponent, canActivate: [AuthGuard] },
  { path: 'platform/max', component: MaxComponent },
  { path: 'platform/aggregation', component: AggregationComponent },
  { path: 'platform/formula', component: FormulaComponent },
  { path: 'platform/query', component: QueryComponent },
  { path: 'platform/cosmosDB', component: CosmosDBComponent },
  { path: 'platform/cosmosDBSink', component: CosmosDBSinkComponent },
  { path: 'platform/blobstorage', component: BlobStorageComponent },
  { path: 'platform/blobstoragesink', component: BlobStorageSinkComponent },
  { path: 'platform/dataExplorer', component: DataExplorerComponent },
  { path: 'platform/dashboard', component: DashboardComponent },
  { path: 'platform/canvas/:id', component: PipelineDesignerComponent },
  { path: 'platform/roles', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'platform/stages/new', component: AddStageComponent },
  { path: 'platform/stages/:id', component: EditStageComponent },
  { path: 'platform/stages', component: ShowStageComponent },
  { path: 'platform', redirectTo: 'platform/dashboard', canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
