const router = require('express').Router();
const { signup, signin, isSignedIn, signout, getAllUsers } = require('../Controllers/AuthControl');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/isSigned', isSignedIn);
router.post('/signout', signout);
router.get('./users', getAllUsers);

module.exports = router;