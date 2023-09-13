var express = require('express');
var router = express.Router();

/* GET users listing. */
const postController = require('../controllers/postController')

router.get('/', postController.all)
router.post('/', postController.store)
router.get('/:id', postController.show)
router.put('/:id', postController.update)
router.delete('/:id', postController.destroy)

module.exports = router;

