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

router.get('/edit/:id',async (req, res) => {
    const expenseId = req.params.id  
    const expenseData = await expense.findById(expenseId).lean()
    const categoryData = await category.find().select('name').lean() 
    return res.render('edit', { expenseData,  categoryData})
})

router.put('/edit/:id', (req, res) => {
    const expenseId = req.params.id 
    expense.findByIdAndUpdate(expenseId, { $set: req.body })
    .then(()=> res.redirect('/'))
})

module.exports = router