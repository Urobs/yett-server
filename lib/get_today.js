const Op = require('sequelize').Op;

module.exports = () => {
  let today = [];
  today.push(new Date().getFullYear());
  today.push(new Date().getMonth() + 1);
  today.push(new Date().getDate());
  today = today.join('-');
  return {
    [Op.lt]: today + ' 24:00:00',
    [Op.gt]: today + ' 00:00:00'
  }
}