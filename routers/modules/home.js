const express = require('express')
const router = express.Router()
const expense = require('../../models/expense')
const category = require('../../models/category')

router.get('/', async (req, res)=>{
    const categoryData = await category.find().select('name').lean() 
    const { expenses, totalAmount } = await expense.find()
    .lean()
    .sort({ date: 'desc' }) 
    .then(expenses =>{   
        const totalAmount = expenses.map(expense => expense.amount).reduce((a, b) => a + b)
        return {expenses, totalAmount}
    })
    res.render('index', { expenses, totalAmount, categoryData })
})

router.post('/search', async (req, res) => {
    const { categoryId } = req.body
    const categoryData = await category.find().select('name').lean()
    const searchResult = await expense.find({ categoryId }).lean()
    return res.render('index', { expenses: searchResult, categoryData})
})

module.exports = router

//res.render('index', { expenses, totalAmount })