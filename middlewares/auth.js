const jwt = require('jsonwebtoken');
const { secret } = require('../config').jwt;
const { getUserId } = require('../services/user');
const ApiError = require('../lib/api_error');

module.exports = async (ctx, next) => {
  try { 
    const token = ctx.header.authorization;
    const decoded = jwt.verify(token.split(' ')[1], secret);
    const userId = await getUserId(decoded.openid);
    ctx.state.userId = userId;
  } catch (err) {
    console.log(err);
    throw new ApiError('auth_error: token验证失败');
  }
  await next();
}