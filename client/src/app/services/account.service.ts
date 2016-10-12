import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { Account } from '../models/account';
import { ApiService } from './api.service';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {

  public currentUser$: Observable<Account>;

  private currentUserSource: ReplaySubject<Account>;

  constructor(private apiService: ApiService) {
    this.currentUserSource = new ReplaySubject<Account>(1);
    this.currentUser$ = this.currentUserSource.asObservable();
  }

  public getMe(): Observable<Account> {
    return this.apiService.get('Accounts/me')
      .do(
        (account) => {
          this.currentUserSource.next(account);
        },
        (err) => {
          this.currentUserSource.next(null);
          this.apiService.setAccessToken(null);
        }
      );
  }

  public login(email: string, password: string): Observable<Account> {
    const params = { email, password };
    return this.apiService.post('Accounts/signin', params)
      .do(
        (account) => {
          this.currentUserSource.next(account);
          this.apiService.setAccessToken(account.accessToken);
        },
        (err) => {
          this.currentUserSource.next(null);
          this.apiService.setAccessToken(null);
        }
      );
  }
}
