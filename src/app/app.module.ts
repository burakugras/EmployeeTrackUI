import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Template-driven forms için gerekli
import { HttpClientModule } from '@angular/common/http'; // HTTP işlemleri için gerekli

import { AppRoutingModule } from './app-routing.module'; // Routing modülü
import { AppComponent } from './app.component'; // Ana bileşen
import { LoginComponent } from './login/login.component'; // Login bileşeni
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { LeaveRequestCreateComponent } from './leave-request-create/leave-request-create.component'; // Leave Request bileşeni

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LeaveRequestComponent,
    LeaveRequestCreateComponent // Leave Request bileşenini ekledik
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
