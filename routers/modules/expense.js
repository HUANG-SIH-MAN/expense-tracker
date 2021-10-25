const express = require('express')
const router = express.Router()

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create' ,(req, res) => {
    res.redirect('/')
})

module.exports = router