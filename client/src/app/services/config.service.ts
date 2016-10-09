
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ConfigService {
  private config: any = null;

  constructor () {
    this.config = window.config;
  }

  public get(keypath: string): any {
    return _.get(this.config, keypath);
  }
}
