const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/', loginController.login);
router.post('/verify-token', loginController.verifyToken);

module.exports = router;