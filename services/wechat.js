const format = require('util').format;
const httpsGet = require('../lib/https_get');
const { baseUrl, appid, secret } = require('../config').wechat;
/**
 * get User's session_key and openid
 * @param {code}
 * @returns {Object}
 */

module.exports = async (code) => {
  const url = format(baseUrl, appid, secret, code);
  const result = await httpsGet(url);
  return JSON.parse(result);
}