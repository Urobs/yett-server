const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const errorHandler = require('./middlewares/error_handler');

const app = new Koa();

app.use(logger());
app.use(errorHandler);
app.use(bodyParser());

app.listen(3000);