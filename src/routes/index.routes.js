const { Router } = require('express');
const { home, notFound, receivedTemp, graphics, data } = require('../controllers/index.controllers');

const router = Router();

router.get('/', home);
router.get('/graphics', graphics);
router.get('/send/temp', receivedTemp);
router.get('/data', data);
router.get('*', notFound);

module.exports = router;