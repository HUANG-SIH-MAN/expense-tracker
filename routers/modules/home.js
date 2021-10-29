const express = require('express')
const moment = require('moment')
const router = express.Router()
const expense = require('../../models/expense')
const category = require('../../models/category')

router.get('/', async (req, res) => {
    const userId = req.user._id
    //取得類別相關資料
    const { categoryId } = req.query
    const categoryData = await category.find().select('name').lean()

    //判定是使用是否使用搜尋功能
    const expenseFind = categoryId ? { $and: [{userId}, {categoryId}] } : { userId }

    //取得支出相關資料
    const { searchResult, totalAmount } = await expense.find(expenseFind)
    .lean()
    .sort({ date: 'desc' }) 
    .then(searchResult =>{
        if (searchResult.length === 0) return res.render('index',{ categoryData })  
        //計算總金額
        const totalAmount = searchResult.map(expense => expense.amount).reduce((a, b) => a + b)
        //取得類別圖示和時間轉換
        searchResult.forEach(item => {
            category.findById(item.categoryId).then(category => item.icon = category.icon)
            item.date = moment(item.date).format('YYYY-MM-DD')
        })
        return { searchResult, totalAmount }
    })
    return res.render('index', { expenses: searchResult, totalAmount, categoryData})
})

module.exports = router


    // const searchCaregory = category.findById(categoryId).then(item => item.name)
    // categoryData.forEach(item => item.searchCaregory = searchCaregory)

    // console.log(categoryData)