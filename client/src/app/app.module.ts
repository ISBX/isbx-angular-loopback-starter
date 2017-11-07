import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccountService } from './services/account.service';
import { ApiService } from './services/api.service';
import { ConfigService } from './services/config.service';

import { routes } from './app.routes';
import { LoggedInGuard } from './logged-in.guard';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    AccountService,
    ApiService,
    ConfigService,
    LoggedInGuard,
    Title
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
