import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { LoggedInGuard } from './logged-in.guard';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [ LoggedInGuard ] },
  { path: 'login', component: LoginComponent }
];
