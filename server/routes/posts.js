var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var {addPost, deletePost, updatePost} = require('../controllers/posts')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:id/articles',authentication,addPost)
router.put('/:id',authentication,updatePost)
router.delete('/:id',authentication,deletePost)


module.exports = router;
