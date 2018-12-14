const User = require('../model').User;
const QueryError = require('../lib/query_error');

/**
 * create a user
 * @param {String} openid
 * @returns {Promise}
 */

 async function createUser (openid) {
  const result =  await User.create({ openid }).catch(err => {
    console.log(err);
    throw new QueryError('create_error: 用户创建失败');
  });
  return result;
 }

/**
 * get user's id
 * @param {String} openid
 * @returns {Promise}
 */

async function getUserId (openid) {
  const result = await User.findOne({
    where: { openid },
    attributes: ['id']
  }).catch(err => {
    console.log(err);
    throw new QueryError('get_id_error: 用户id查找错误');
  });
  if (!result.id) {
    throw new QueryError('get_id_error: 找不到该用户id');
  }
  return result.id;
}

 module.exports = { createUser, getUserId }