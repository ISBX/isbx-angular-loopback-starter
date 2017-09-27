import { Errors } from '../lib/Errors';
import { db } from 'loopback-crud';
import * as path from 'path';

const env = process.env.NODE_ENV;

interface AccountInstance {
  firstname: string;
  username: string;
  email: string;
  created: Date;

  emailVerified: boolean;
  verify(options: any);
}

interface AccountModel extends db.DataAccessObject<AccountInstance> {
  // 'Class' properties
  defaultIncludes: any;

  // 'Class' methods
  signin(userInfo);
  signup(userInfo);
  login(userInfo);

  checkEmail(email: string);
}

/* tslint:disable */
export = (Account: AccountModel) => {
/* tslint:enable */

  const app = require('../server');

  Account.defaultIncludes = [];

  Account.signin = async (userInfo): Promise<any> => {
    userInfo.ttl = userInfo.ttl || 31556926; // 1-year
    const accessToken = await Account.login(userInfo);
    if (accessToken && accessToken.id && accessToken.userId) {
      const filter = {
        include: Account.defaultIncludes,
        where: { id: accessToken.userId }
      };
      const account = await Account.findOne(filter);
      const response: any = account;
      response.accessToken = accessToken.id;
      response.accessTokenTTL = accessToken.ttl;
      response.accessTokenCreated = accessToken.created;
      return response;
    }
    throw Errors.makeError('ERROR_LOGIN_FAILED');
  };

  Account.remoteMethod('signin', {
    http: { path: '/signin', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'data', type: 'object', root: true },
    description: 'login user'
  });

  Account.signup = async (userInfo: AccountInstance) => {
    const testAccount = await Account.checkEmail(userInfo.email);
    if (testAccount) {
      throw Errors.makeError('ERROR_EMAIL_EXISTS');
    }

    userInfo.username = userInfo.email;
    userInfo.created = new Date();
    userInfo.emailVerified = false;

    const account = await Account.create(userInfo);
    const options = {
      name: account.firstname,
      currentYear: new Date().getFullYear(),
      type: 'email',
      to: account.email,
      from: app.get('email'),
      subject: 'Account Confirmation',
      template: path.resolve(`${__dirname}/../../files/email_forms/activation_email.html`),
      account
    };

    // Don't send email if using test env
    if (env === 'test') {
      return;
    }

    return await account.verify(options);
  };

  Account.remoteMethod('signup', {
    http: { path: '/signup', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'data', type: 'object', root: true },
    description: 'inserts user info'
  });

  // returns true if email not exists, else return error.
  Account.checkEmail = async (email) => {
    /* tslint:disable */
    const regEx = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* tslint:enable */

    if (!regEx.test(email)) {
      throw Errors.makeError('ERROR_EMAIL_INVALID');
    }

    return await Account.findOne({ where: { email } });
  };
};
