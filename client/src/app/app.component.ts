import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { AccountService } from './services/account.service';

import '../styles.styl';

@Component({
  selector: 'app',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl']
})

export class AppComponent implements OnInit {

  constructor(private accountService: AccountService, public router: Router, private titleService: Title) { }

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
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.titleService.setTitle('ISBX Angular2 Loopback Starter');
      }
    });
  }
}
