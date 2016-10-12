import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AccountService } from './services/account.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) { }

  public canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.map(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
      return !!user;
    }).take(1);
  }
}
