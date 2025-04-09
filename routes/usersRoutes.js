const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/', usersController.create);
router.get('/', usersController.findAll);

module.exports = router;