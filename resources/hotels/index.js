const router     = require('express').Router();
const controller = require('./controller');
const views      = require('./viewsController');

// special routes (HTML ONLY)
router.get('/new', views.formNew);
router.get('/:id/edit', controller.getOne, views.formEdit);

router.route('/:id(\\d+)/')
  .get(controller.getOne, views.showOne)
  .put(controller.update, views.handleUpdate)
  .delete(controller.destroy, views.handleDelete);

// put route here for GET /hotels
router.route('/')
  .get(controller.index, views.listAll)
  .post(controller.create, views.handleCreate);

module.exports = router;
