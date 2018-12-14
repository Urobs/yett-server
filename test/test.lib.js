const QueryError = require('../lib/query_error');
const httpsGet = require('../lib/https_get');
const getToday = require('../lib/get_today')

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
  describe.skip('httpsGet()', () => {
    it('return json', async () => {
      const url = 'https://api.github.com';
      const result = await httpsGet(url);
      console.log(result);
    });
  });
  describe('getToday()', () => {
    it('return today etire time', () => {
      console.log(getToday());
    });
  })
});