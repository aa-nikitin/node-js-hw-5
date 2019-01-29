const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// На все get-запросы отдавать index.html
router.get('/', (req, res) => {
  res.render('dist');
});

router.post('/saveNewUser', controllers.saveNewUser);
router.post('/login', controllers.login);
router.post('/authFromToken', controllers.authFromToken);

router.get('/getNews', controllers.getNews);

module.exports = router;
