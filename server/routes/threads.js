var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
var { addThread, deleteThread, updateThread, getUserThread, getAllThread, getOneThread } = require('../controllers/threads')

/* GET users listing. */
router.get('/',getAllThread)
router.get('/user',authentication,getUserThread)
router.get('/:id',getOneThread)

router.post('/', authentication, addThread)
router.put('/:id',authentication, updateThread)
router.delete('/:id',authentication,deleteThread)

module.exports = router;
