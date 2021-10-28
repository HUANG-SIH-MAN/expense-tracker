const express = require('express')
const router = express.Router()
const expense = require('../../models/expense')
const category = require('../../models/category')

router.get('/', async (req, res)=>{
    const userId = req.user._id
    //取得分類名稱，用於select選單
    const categoryData = await category.find().select('name').lean() 
    //取得支出資料，並計算總金額
    const { expenses, totalAmount } = await expense.find({ userId })
    .lean()
    .sort({ date: 'desc' }) 
    .then(expenses =>{ 
        if (expenses.length === 0) return res.render('index',{ categoryData })  
        const totalAmount = expenses.map(expense => expense.amount).reduce((a, b) => a + b)
        //取得類別圖示
        expenses.forEach(item => {
            category.findById(item.categoryId).then(category => item.icon = category.icon)
        })
        return { expenses, totalAmount }
    })
    res.render('index', { expenses, totalAmount, categoryData })
})

router.post('/search', async (req, res) => {
    const userId = req.user._id
    const { categoryId } = req.body
    const categoryData = await category.find().select('name').lean()
    const { searchResult, totalAmount } = await expense.find({ $and: [{userId}, {categoryId}] })
    .lean()
    .then(searchResult =>{
        if (searchResult.length === 0) return res.render('index',{ categoryData })  
        //計算總金額
        const totalAmount = searchResult.map(expense => expense.amount).reduce((a, b) => a + b)
        //取得類別圖示
        searchResult.forEach(item => {
            category.findById(item.categoryId).then(category => item.icon = category.icon)
        })
        return { searchResult, totalAmount }
    })
    return res.render('index', { expenses: searchResult, totalAmount, categoryData})
})

module.exports = router

