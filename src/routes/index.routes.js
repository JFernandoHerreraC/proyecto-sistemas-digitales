const { Router } = require('express');
const { home, notFound, receivedTemp, graphics, data, subscription, worker } = require('../controllers/index.controllers');

const router = Router();

router.get('/', home);
router.get('/graphics', graphics);
router.get('/send/temp', receivedTemp);
router.get('/data', data);
router.get('/worker.js', worker)
router.post('/subscription', subscription)
router.get('*', notFound);

module.exports = router;