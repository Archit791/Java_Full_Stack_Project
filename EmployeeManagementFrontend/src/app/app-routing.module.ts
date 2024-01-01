import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomePageComponent } from './my-components/user-home-page/user-home-page.component';

const routes: Routes = [
  { path: '', component: UserHomePageComponent },
  { path: 'uersHomePage', component: UserHomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
