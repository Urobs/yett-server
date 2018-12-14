const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const errorHandler = require('./middlewares/error_handler');
const validate = require('koa-validate');
const router = require('./routes/api');

const app = new Koa();
validate(app);

app.use(logger());
app.use(errorHandler);
app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);