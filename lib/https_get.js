const https = require('https');
/**
 * https GET method
 * @param {String} url
 * @returns {Promise}
 */
module.exports = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let buffer = [];
      res.on('data', data => {
        buffer.push(data);
      });
      res.on('end', () => {
        const result = Buffer.concat(buffer);
        resolve(result.toString());
      });
    }).on('error', err => {
      reject(err);
    });
  });
}