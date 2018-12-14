const User = require('../services/user')

describe.skip('createUser()', () => {
  it('return a promise', async () => {
    try {
      const result = await User.createUser('qfqwfqde1');
      console.log(result);
    } catch (err) {
      console.log(err);
    };
  });
});

describe.skip('getUserId()', () => {
  it('renturn a promise which can access id', async () => {
      const result = await User.getUserId('qfqwfqde');
      console.log(result.id);
  });
});