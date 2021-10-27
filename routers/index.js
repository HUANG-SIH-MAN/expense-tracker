const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const user = require('./modules/user')

router.use('/users', user)
router.use('/expense', expense)
router.use('/', home)

module.exports = router