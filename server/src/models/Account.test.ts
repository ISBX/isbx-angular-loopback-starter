import { TestUtils } from '../lib/TestUtils';
import * as app from '../server';
import * as assert from 'assert';

const supertest = require('supertest');
const server = supertest(app);

/* tslint:disable */
const Account = app.models.Account;
const AccessToken = app.models.AccessToken;
/* tslint:enable */

let logoutAccessToken;
let accessToken;

describe('Account', () => {

  before((done) => {
    return TestUtils.resetDatabase()
      .then(() => {
        return Account.create({
          username: 'admin',
          email: 'admin@example.com',
          password: 'password'
        });
      })
      .then(() => {
        return AccessToken.create({
          userId: 1
        });
      })
      .then((token) => {
        accessToken = token.id;
      })
      .asCallback(done);
  });

  describe('#signin', () => {
    it('ACL - should allow $everyone to attempt to signin', done => {
      server
        .post('/api/Accounts/signin')
        .expect(400)
        .end((err, res) => {
          done(err);
        });
    });
    it('it should fail a non-existent account', done => {
      server
        .post('/api/Accounts/signin')
        .send({
          email: 'bad@example.com',
          password: '123456'
        })
        .expect(401)
        .end((err, res) => {
          done(err);
        });
    });
    it('it should succeed on a real account', done => {
      server
        .post('/api/Accounts/signin')
        .send({
          email: 'admin@example.com',
          password: 'password'
        })
        .expect(200)
        .end((err, res) => {
          logoutAccessToken = res.body.accessToken;
          done(err);
        });
    });
  });

  describe('#logout', () => {
    it('ACL - should not allow $everyone to attempt to logout -- current behavior is a bug', done => {
      // TODO current behavior is a bug, something in User model is taking precedence on this ACL
      server
        .post('/api/Accounts/logout')
        .expect(500)
        .end((err, res) => {
          done(err);
        });
    });
    it('ACL - should allow $authenticated to attempt to logout', done => {
      server
        .post('/api/Accounts/logout')
        .set('Authorization', logoutAccessToken)
        .expect(204)
        .end((err, res) => {
          done(err);
        });
    });
    it('it should have invalidated the token', done => {
      server
        .get('/api/Accounts/1')
        .set('Authorization', logoutAccessToken)
        .expect(401)
        .end((err, res) => {
          done(err);
        });
    });
  });

  describe('#findById', () => {
    it('ACL - should not allow $everyone to view a specific user', done => {
      server
        .get('/api/Accounts/1')
        .expect(401)
        .end((err, res) => {
          done(err);
        });
    });
    it('ACL - should allow $authenticated to view a specific', done => {
      server
        .get('/api/Accounts/1')
        .set('Authorization', accessToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.id, 1);
          done(err);
        });
    });
    it('it should support substituting the string literal me for the :id', done => {
      server
        .get('/api/Accounts/me')
        .set('Authorization', accessToken)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.id, 1);
          done(err);
        });
    });
  });
});
