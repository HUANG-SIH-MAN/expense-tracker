const express = require('express')
const category = require('../../models/category')
const expense = require('../../models/expense')
const router = express.Router()

router.get('/create', (req, res) => {
    category.find()
    .lean()
    .then(category => res.render('create', { category }))
})

router.post('/create' ,(req, res) => {
    const { name, date, amount, categoryId } =req.body
    expense.create({
        name, 
        date, 
        amount, 
        categoryId 
    })
    .then(()=> res.redirect('/')) 
})

module.exports = router