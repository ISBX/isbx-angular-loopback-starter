import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';

import { ConfigService } from './config.service';

// Import RxJs required methods
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiBaseURL: string = null;
  private _accessToken: string = null;
  private ACCESS_TOKEN_KEY: string = 'accessToken';

  constructor(private configService: ConfigService,
              private http: Http) {
    this.apiBaseURL = configService.get('apiBaseURL');
    this._accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public setAccessToken(token: string) {
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
    this._accessToken = token;
  }

  public get(path: string, data?: Object): Observable<any> {
    const params = new URLSearchParams();
    _.each(data || {}, (value, key) => {
      params.set(key, value);
    });

    const headers    = new Headers(_.extend(this.getHeaders()));
    const options    = new RequestOptions({ search: params, headers });

    return this.http.get(this.apiBaseURL + path, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public post(path: string, data: Object): Observable<any> {
    const bodyString = JSON.stringify(data);
    const headers    = new Headers(_.extend(this.getHeaders()));
    const options    = new RequestOptions({ headers });

    return this.http.post(this.apiBaseURL + path, bodyString, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public put(path: string, data: Object): Observable<any> {
    const bodyString = JSON.stringify(data);
    const headers    = new Headers(this.getHeaders());
    const options    = new RequestOptions({ headers });

    return this.http.put(this.apiBaseURL + path, bodyString, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private getHeaders() {
    const headers: any = {
      'Content-Type': 'application/json'
    };

    if (this._accessToken) {
      headers.Authorization = this._accessToken;
    }

    return headers;
  }

}
