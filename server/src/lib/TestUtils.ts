import * as Promise from 'bluebird';

const app = require('../server');

export class TestUtils {
  public static resetDatabase() {
    if (app.get('env') && app.get('env') === 'test') {
      return Promise.resolve(app.dataSources.db.automigrate());
    } else {
      return Promise.reject('resetDatabase only works in the test environment');
    }
  }
}
