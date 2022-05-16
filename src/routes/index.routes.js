const { Router } = require('express');
const { home,notFound, receivedTemp } = require('../controllers/index.controllers');

const router = Router();

router.get('/', home);
router.get('/send/temp', receivedTemp);
router.get('*', notFound);

module.exports = router;