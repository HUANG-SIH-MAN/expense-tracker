const express = require('express')
const router = express.Router()
const expense = require('../../models/expense')

router.get('/',(req, res)=>{
    expense.find()
    .lean()
    .then(expenses => res.render('index', { expenses }))
})

module.exports = router