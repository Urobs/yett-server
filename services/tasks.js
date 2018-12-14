const Tasks = require('../model').Tasks;
const QueryError = require('../lib/query_error');

/**
 * add a task
 * @param {Object} task
 */

async function addTasks (task) {
  const result = await Tasks.create(task).catch(err => {
    console.log(err);
    throw new QueryError('task_create_error: 任务创建失败');
  });
  return result;
}

/**
 * mark a task finished or expired
 * @param {taskId, userId} id
 */

async function markFinishTask ({ taskId, userId }) {
  const result = await Tasks.update({
    isFinished: 'yes'
  }, {
    where: { id: taskId, userId }
  });
  if (result[0] === 0) {
    throw new QueryError('task_update_fail: 任务更新失败');
  }
  return result;
}

async function markExpire ({ taskId, userId }) {
  const result = await Tasks.update({
    isExpired: 'yes'
  }, {
    where: { id: taskId, userId }
  });
  if (result[0] === 0) {
    throw new QueryError('task_update_fail: 任务更新失败');
  }
  return result;
}

/**
 * get tasks
 * @param { where, offset, limit } param
 * @returns { counts, rows } 
 */

async function getTasks ({ where, offset, limit }) {
  const result = await Tasks.findAndCountAll({
    where,
    offset,
    limit
  }).catch (err => {
    console.log(err);
    throw new QueryError('task_search_error: 任务查询错误');
  });
  return result; 
}

/**
 * delete task
 * @param {taskId, userId} id
 */

async function deleteTask ({ taskId, userId }) {
  const result = await Tasks.destroy({
    where: { id: taskId, userId }
  });
  if (result === 0) {
    throw new QueryError('task_delete_fail: 没有这项任务');
  }
  return result;
}

module.exports = { 
  addTasks, 
  markFinishTask, 
  markExpire, 
  getTasks, 
  deleteTask 
}