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

router.delete('/deleteUser/:id', authJwt, controllers.deleteUser);
router.put(
  '/updateUserPermission/:id',
  authJwt,
  controllers.updateUserPermission
);

router.get('/getNews', authJwt, controllers.getNews);
router.post('/newNews', authJwt, controllers.newNews);
router.delete('/deleteNews/:id', authJwt, controllers.deleteNews);
router.put('/updateNews/:id', authJwt, controllers.updateNews);

router.get('/getUsers', authJwt, controllers.getUsers);
router.put('/updateUser/:id', authJwt, controllers.updateUser);
router.post('/saveUserImage/:id', authJwt, controllers.saveUserImage);
// newNews;

// router.post('/test', controllers.test.testPost);
// router.get('/test', controllers.test.testGet);

module.exports = router;
