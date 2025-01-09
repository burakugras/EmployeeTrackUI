import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveRequestCreateComponent } from './leave-request-create/leave-request-create.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'leave-request', component: LeaveRequestComponent, canActivate: [AuthGuard] },
  { path: 'leave-request-create', component: LeaveRequestCreateComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
