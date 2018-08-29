var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var {upVotesPost,upVotesThread,downVotesPost,downVotesThread} = require('../controllers/votes')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/up/threads/:id',authentication,upVotesThread)
router.post('/down/threads/:id',authentication,downVotesThread)
router.post('/up/threads/:id/post/:postid',authentication,upVotesPost)
router.post('/down/threads/:id/post/:postid',authentication,downVotesPost)

module.exports = router;
