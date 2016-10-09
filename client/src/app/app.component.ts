import { Component, OnInit } from '@angular/core';

import { AccountService } from './services/account.service';

import '../styles.styl';

@Component({
  selector: 'app',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  public ngOnInit(): void {
    // used during initial load to populate the currentUser if we have an accessToken stored
    this.accountService.getMe()
      .subscribe(
        (account) => {
          // do nothing
        },
        (err) => {
          // do nothing
        }
      );
  }
}
