const tasks = require('../services/tasks');
const Op = require('sequelize').Op;

describe('tasks service', () => {
  describe('addTasks()', () => {
    it('return new task', async () => {
      const task = {
        content: 'hello world',
        expireTime: new Date(),
        userId: 1
      };
      const result = await tasks.addTasks(task);
      console.log(result);
    });
  });
  describe.skip('markTask', () => {
    it('return updated task', async () => {
      const task = {
        taskId: 1,
        userId: 1
      };
      const result = await tasks.markFinishTask(task);
      console.log(result[0]);
    });
    it('return updated task', async () => {
      const task = {
        taskId: 1,
        userId: 1
      };
      const result = await tasks.markExpire(task);
      console.log(result[0]);
    });
  });
  describe.skip('getTasks()', () => {
    it('get task today', async () => {
      const timeBase = new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1) + '-' + new Date().getDate();
      const query = {
        where: {
          userId: 1,
          createTime: {
            [Op.lt]: timeBase + ' 24:00:00',
            [Op.gt]: timeBase + ' 00:00:00'
          }
        },
        offset: 0,
        limit: 10
      };
      const result = await tasks.getTasks(query);
      console.log(result);
    });
  });
});