const {Router} = require('express');

const router = Router();

const controller = require('../controllers/indexController.js');


router.get('/', controller.index);


module.exports = router;