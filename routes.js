var express = require('express');
var router = express.Router();

var userController = require('./controllers/userController.js');
var bdController = require('./controllers/betaDictionaryController.js');

// ---- USERS
//GET
router.get('/test', userController.test);








// ---- BETA DICTIONARY
router.get('/bd/test/:name', bdController.test);



module.exports = router;