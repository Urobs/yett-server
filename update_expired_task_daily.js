const schedule = require('node-schedule');
const fs = require('fs');
const Op = require('sequelize').Op;
const { Tasks } = require('./model');
const logFilePath = './logs/db_flush.log';

const markAllTasksExpired = async () => {
  const result = await Tasks.update({
    isExpired: 'yes'
  }, {
    where: {
      [Op.and]: [{ isExpired: 'no' }, { isFinished: 'no' }]
    }
  }).catch(err => {
    throw new Error(err);
  });
  console.log(result);
  return result;
}

module.exports = () => {
  const postion = fs.statSync(logFilePath).size;
  const wFile = fs.createWriteStream(logFilePath, { flags: 'r+', start: postion });
  const job = schedule.scheduleJob('59 59 23 * * *', async () => {
    try { 
      await markAllTasksExpired().then(() => {
        console.log('writed');
        wFile.write('job done: ' + new Date() + '\n', 'UTF8');
        wFile.end();
      });
    } catch (err) {
      wFile.write('job failed: ' + err + '\n', 'UTF8');
      wFile.end();
    }
  });
}