const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

const passport = require('passport');
const authJwt = passport.authenticate('jwt', { session: false });

// На все get-запросы отдавать index.html
router.get('/', (req, res) => {
  res.render('dist');
});

router.post('/saveNewUser', controllers.saveNewUser);
router.post('/login', controllers.login);
router.post('/authFromToken', controllers.authFromToken);

router.put(
  '/updateUserPermission/:id',
  authJwt,
  controllers.updateUserPermission
);

router.delete('/deleteUser/:id', controllers.deleteUser);

router.get('/getNews', controllers.getNews);

router.get('/getUsers', controllers.getUsers);
router.put('/updateUser/:id', controllers.updateUser);

router.post('/test', controllers.test.testPost);
router.get('/test', controllers.test.testGet);

module.exports = router;
