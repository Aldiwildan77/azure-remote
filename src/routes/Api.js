const router = require('express').Router();
const apiController = require('../controllers/Api');

router.get('/start', apiController.start);
router.get('/deallocate', apiController.deallocate);
router.post('/run-command', apiController.runCommand);

module.exports = router;
