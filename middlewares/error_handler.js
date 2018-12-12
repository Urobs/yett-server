const ApiError  = require('../lib/api_error');
const QueryError = require('../lib/query_error');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ApiError || err instanceof QueryError) {
      ctx.status = 400;
      ctx.body = {
        type: err.name,
        message: err.message 
      }
    } else {
      console.log(err);
      ctx.status = 500;
      ctx.body = {
        type: 'internal:unknown_error',
        message: ''
      }
    }
  }
}