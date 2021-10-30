const express = require('express')
const moment = require('moment')
const category = require('../../models/category')
const expense = require('../../models/expense')
const router = express.Router()

router.get('/create', (req, res) => {
    category.find()
    .sort({ _id: 'asc' })
    .lean()
    .then(category => res.render('create', { category }))
})

router.post('/create' ,(req, res) => {
    const { name, date, amount, categoryId } =req.body
    expense.create({
        name, 
        date, 
        amount,
        userId: req.user._id, 
        categoryId 
    })
    .then(()=> res.redirect('/')) 
})

router.get('/edit/:id',async (req, res) => {
    const expenseId = req.params.id  
    const expenseData = await expense.findById(expenseId).lean()
    expenseData.date = moment(expenseData.date).format('YYYY-MM-DD')
    const categoryData = await category.find().select('name').sort({ _id: 'asc' }).lean()  
    for (let item of categoryData) {
        if (item._id.toString() === expenseData.categoryId.toString()) {
          item.selected = 'selected'  
          return res.render('edit', { expenseData,  categoryData})
        }
    }
})

router.put('/:id', (req, res) => {
    const expenseId = req.params.id 
    expense.findByIdAndUpdate(expenseId, { $set: req.body })
    .then(()=> res.redirect('/'))
})

router.delete('/:id', (req, res) => {
    const expenseId = req.params.id
    expense.findByIdAndDelete(expenseId)
    .then(()=> res.redirect('/'))
})

module.exports = router