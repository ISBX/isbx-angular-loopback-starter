import * as Promise from 'bluebird';
import * as _ from 'lodash';

// These functions expect the model primary keys to be 'id'
// They could be refactored to discover the primary key from the
// model and use that.

// These functions support both callback and promise based conventions

export class Utils {
  public static getFromIdList(model, includeFilter, idList, callback?) {
    // make sure idList is like: [{id: 0}]
    // returns Objects in same order as idList
    const ids = _.map(idList, 'id');
    const filter = {
      where: {id: {inq: ids}},
      include: includeFilter
    };

    return Promise.resolve(model.find(filter))
      .then((results) => {
        return _.sortBy(results, (single: any) => {
          return _.findIndex(ids, id => id === single.id);
        });
      })
      .asCallback(callback);
  }

  public static getFromSQL(model, includeFilter, sqlQuery, params, callback?) {
    const dataSource = model.app.datasources.db;

    return new Promise((resolve, reject) => {
      dataSource.connector.query(sqlQuery, params, (err, sqlResults) => {
        if (err) { return reject(err); }
        return resolve(sqlResults);
      });
    }).then((sqlResults) => {
      return Utils.getFromIdList(model, includeFilter, sqlResults)
        .then((results) => {
          return _.map(results, (single, index) => {
            // merge extra fields into the Accounts
            const sqlResult = _.mapValues(sqlResults[index], (value) => {
              const retval = parseInt(value, 10);
              return isNaN(retval) ? value : retval;
            });
            return _.extend(single, sqlResult);
          });
        });
    }).asCallback(callback);
  }

  public static getOneFromSQL(model, includeFilter, sqlQuery, params, callback?) {
    return Utils.getFromSQL(model, includeFilter, sqlQuery, params)
      .then((results) => {
        if (results) {
          return results[0];
        }
      })
      .asCallback(callback);
  }
}
