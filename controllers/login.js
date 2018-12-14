const jwt = require('jsonwebtoken');
const { createUser, getUserId } = require('../services/user');
const getCodeAndSession = require('../services/wechat');
const ApiError = require('../lib/api_error');
const { secret, expiresIn } = require('../config').jwt;

module.exports = async (ctx) => {
  ctx.checkParams('code').notEmpty().escape();
  if (ctx.errors) {
    throw new ApiError('params_validate_error: 参数不能为空');
  }
  const { openid, errcode, errmsg } = await getCodeAndSession(ctx.code);
  if (errcode != 0) {
    console.log(errmsg);
    throw new ApiError('code_request_error: code请求失败');
  }
  try {
    await getUserId(openid);
  } catch (err) {
    await createUser(openid);
  }
  const userToken = { openid };
  const token = jwt.sign(userToken, secret, { expiresIn });

  ctx.status = 200;
  ctx.body = {
    token
  };
}