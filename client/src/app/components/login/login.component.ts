import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.styl']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router) { }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public save(form: any, formValid: boolean): void {
    if (!formValid) {
      // TODO display something? For now we just try anyways
      // return;
    }
    this.accountService.login(form.email, form.password)
      .subscribe(
        (account) => {
          console.log('success', account);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log('err', err);
        });
  }
}
