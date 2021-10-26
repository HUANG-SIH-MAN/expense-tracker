const express = require('express')
const router = express.Router()
const expense = require('../../models/expense')

router.get('/',(req, res)=>{
    expense.find()
    .lean()
    .sort({ date: 'desc' }) 
    .then(expenses =>{   
        const totalAmount = expenses.map(expense => expense.amount).reduce((a, b) => a + b)
        res.render('index', { expenses, totalAmount })
    })
})

module.exports = router