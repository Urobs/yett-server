const Tasks = require('../services/tasks');
const ApiError = require('../lib/api_error');
const createTime = require('../lib/get_today')();
const paramsSortEnum = ['today', 'all', 'expired', 'finished'];
const markTypeEnum = ['finished', 'expired'];

async function getTasks (ctx) {
  ctx.checkQuery('sort').notEmpty().toLowercase().isIn(paramsSortEnum);
  ctx.checkQuery('limit').notEmpty().isInt().toInt();
  ctx.checkQuery('offset').notEmpty().isInt().toInt();
  if (ctx.errors) {
    throw new ApiError('params_validate_err: 参数校验失败');
  }
  const { sort, limit, offset } = ctx.query;
  const { userId } = ctx.state;
  let where = null;
  switch (sort) {
    case 'today':
      where = { userId, createTime };
      break;
    case 'all':
      where = { userId };
      break;
    case 'expired':
      where = { userId, isExpired: 'yes' };
      break;
    case 'finished':
      where = { userId, isFinished: 'yes' };
      break;
  }
  const result = await Tasks.getTasks({ where, offset, limit });
  ctx.body = result;
} 

async function createTask (ctx) {
  ctx.checkBody('content').notEmpty().escape();
  ctx.checkBody('expireTime').notEmpty().isDate().toDate();
  if (ctx.errors) {
    throw new ApiError('params_validate_error: 参数校验失败');
  }
  const { content, expireTime } = ctx.request.body;
  const { userId } = ctx.state;
  await Tasks.addTasks({ content, expireTime, userId });
  ctx.status = 200;
}

async function markTask (ctx) {
  ctx.checkBody('mark').notEmpty().isIn(markTypeEnum).escape();
  ctx.checkParams('id').notEmpty().isInt().toInt();
  if (ctx.errors) {
    throw new ApiError('params_validate_error: 参数校验失败');
  }
  const { mark } = ctx.request.body;
  const taskId = ctx.params.id
  const { userId } = ctx.state;
  if (mark === 'finished') {
    await Tasks.markFinishTask({ taskId, userId });
  } 
  else {
    await Tasks.markExpire({ taskId, userId });
  }
  ctx.status = 200;
}

async function deleteTask (ctx) {
  ctx.checkParams('id').notEmpty().isInt().toInt();
  if (ctx.errors) {
    throw new ApiError('params_validate_error: 参数校验失败');
  }
  const taskId = ctx.params.id;
  const { userId } = ctx.state;
  await Tasks.deleteTask({ taskId, userId });
  ctx.status = 200;
}

module.exports = { createTask, getTasks, markTask, deleteTask };