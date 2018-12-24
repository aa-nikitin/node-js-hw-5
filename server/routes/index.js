const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

router.post('/saveNewUser', controllers.saveNewUser);

module.exports = router;
