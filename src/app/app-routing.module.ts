import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponentComponent } from './auth-page-component/auth-page-component.component';
import { AuthGuard } from './auth-page-component/services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile/profile.component';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponentComponent },
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
