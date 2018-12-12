const QueryError = require('../lib/query_error');

describe('lib function', () => {
  describe.skip('throw QueryError', () => {
    it('return QueryError', () => {
      try { 
        throw new QueryError('qeury error'); 
      } catch (err) {
        console.log(err);
      }
    });
  });
});