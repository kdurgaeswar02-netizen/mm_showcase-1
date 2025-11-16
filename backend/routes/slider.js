const router = require('express').Router();
const auth = require('../middlewares/auth');
const ctrl = require('../controllers/sliderController');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);

// admin protected
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
