const router = require('express').Router()
const apiController = require('../controllers/Api')

router.get('/start', apiController.startVm)

module.exports = router