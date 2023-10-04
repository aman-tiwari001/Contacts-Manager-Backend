const express = require('express');
const router = express.Router();
const {registerUser, loginUser, currentUser} = require('../controllers/userController.js');
const verifyJWT = require('../middleware/verifyJWT.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', verifyJWT, currentUser);

module.exports = router;