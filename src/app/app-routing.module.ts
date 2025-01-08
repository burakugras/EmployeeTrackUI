import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'leave-request', component: LeaveRequestComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
