const sequelize = require('../model').sequelize;

describe('model', () => {
  describe('authenticate()', () => {
    it('test connection', async () => {
      try {
        const res = await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (err) {
        console.log('err');
      }
    });
  });
  describe('sync()', () => {
    it('sync all the models defined in models dir', async () => {
      const re = await sequelize.sync().catch(err => {
        console.log(err);
      });
    });
  });
});