import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { PlatformSharedModule } from '../../projects/Platform/src/app/app.module';
import { BFAISharedModule } from '../../projects/BFAI/src/app/app.module';


const APP_ROUTES: Routes = [
  { path: 'platform',  loadChildren: '../../projects/Platform/src/app/app.module#PlatformSharedModule'},
  { path: 'BFAI',  loadChildren: '../../projects/BFAI/src/app/app.module#BFAISharedModule'},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES),
    PlatformSharedModule.forRoot(),
    BFAISharedModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
