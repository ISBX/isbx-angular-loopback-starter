import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Account } from '../models/account';
import { ApiService } from './api.service';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {

  public currentUser: ReplaySubject<Account>;

  constructor(private apiService: ApiService) {
    this.currentUser = new ReplaySubject<Account>(1);
  }

  public getMe(): Observable<Account> {
    return this.apiService.get('Accounts/me')
      .do(
        (account) => {
          this.currentUser.next(account);
        },
        (err) => {
          this.currentUser.next(null);
          this.apiService.setAccessToken(null);
        }
      );
  }

  public login(email: string, password: string): Observable<Account> {
    const params = { email, password };
    return this.apiService.post('Accounts/signin', params)
      .do(
        (account) => {
          this.currentUser.next(account);
          this.apiService.setAccessToken(account.accessToken);
        },
        (err) => {
          this.currentUser.next(null);
          this.apiService.setAccessToken(null);
        }
      );
  }
}
