const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/authFromToken', controllers.authFromToken);
router.post('/saveNewUser', controllers.saveNewUser);
router.post('/login', controllers.login);

module.exports = router;
