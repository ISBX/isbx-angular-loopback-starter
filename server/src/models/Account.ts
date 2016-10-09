import { Errors } from '../lib/Errors';
import { db } from 'loopback-crud';
import * as path from 'path';

const env = process.env.NODE_ENV;

interface AccountInstance {
  firstname: string;
  username: string;
  email: string;
  created: Date;

  emailVerified: boolean;  verify(options: any, callback);
}

interface AccountModel extends db.DataAccessObject<AccountInstance> {
  // 'Class' properties
  defaultIncludes: any;

  // 'Class' methods
  signin(userInfo, callback);
  signup(userInfo, callback);
  login(userInfo, callback);

  checkEmail(email: string, callback);
}

/* tslint:disable */
export = (Account: AccountModel) => {
/* tslint:enable */

  const app = require('../server');

  Account.defaultIncludes = [];

  Account.signin = (userInfo, callback) => {
    userInfo.ttl = userInfo.ttl || 31556926; // 1-year
    Account.login(userInfo, (error, accessToken) => {

      const processResponse = (accountData, accessTokenData) => {
        Account.findById(accountData.id, (err, response) => {
          if (err) { return callback(err); }

          response.accessToken = accessTokenData.id;
          response.accessTokenTTL = accessTokenData.ttl;
          response.accessTokenCreated = accessTokenData.created;
          return callback(null, response);
        });
      };

      if (accessToken && accessToken.id && accessToken.userId) {
        const filter = {
          include: Account.defaultIncludes,
          where: { id: accessToken.userId }
        };
        Account.findOne(filter, (err, account) => {
          if (err) { return callback(err); }
          return processResponse(account, accessToken);
        });
      } else {
        callback(error, accessToken);
      }
    });
  };

  Account.remoteMethod('signin', {
    http: { path: '/signin', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'data', type: 'object', root: true },
    description: 'login user'
  });

  Account.signup = (userInfo: AccountInstance, callback) => {
    Account.checkEmail(userInfo.email, (err, account) => {
      if (err) { return callback(err, null); }
      if (account) {
        return callback(Errors.makeError('ERROR_EMAIL_EXISTS'));
      }

      userInfo.username = userInfo.email;
      userInfo.created = new Date();
      userInfo.emailVerified = false;

      Account.create(userInfo, (err, account) => {
        if (err) { return callback(err, null); }

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
          return callback(err, null);
        }

        account.verify(options, (err, res) => {
          if (err) { return callback(err); }
          callback(err, {});
        });
      });
    });
  };

  Account.remoteMethod('signup', {
    http: { path: '/signup', verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'data', type: 'object', root: true },
    description: 'inserts user info'
  });

  // returns true if email not exists, else return error.
  Account.checkEmail = (email, callback) => {
    /* tslint:disable */
    const regEx = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /* tslint:enable */

    if (!regEx.test(email)) {
      return callback(Errors.makeError('ERROR_EMAIL_INVALID'));
    }

    Account.findOne({ where: { email } }, callback);
  };
};
