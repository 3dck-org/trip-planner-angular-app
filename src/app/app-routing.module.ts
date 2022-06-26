import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthPageComponentComponent} from "./auth-page-component/auth-page-component.component";

const routes: Routes = [
  {path: 'auth', component: AuthPageComponentComponent},
  {path: '**', component: AuthPageComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
