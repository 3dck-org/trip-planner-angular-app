import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponentComponent } from './auth-page-component/auth-page-component.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth-page-component/services/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthPageComponentComponent },
  {
    path: '',
    pathMatch: 'full',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
