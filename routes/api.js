const Router = require('koa-router');
const login = require('../controllers/login');
const { createTask, getTasks, markTask, deleteTask } = require('../controllers/tasks');
const auth = require('../middlewares/auth');

const router = new Router({
  prefix: '/api'
});

router.get('/login/:code', login);
router.get('/tasks', auth, getTasks);
router.post('/tasks', auth, createTask);
router.put('/tasks/:id', auth, markTask);
router.del('/tasks/:id', auth, deleteTask);

module.exports = router;