const bcrypt = require('bcryptjs')
const userData = require('./userData.json').results
const expenseData = require('./expenseData.json').results
const Expense = require('../expense')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')

db.once('open', async ()=>{
    // 取得支出類別，並寫入expenseData
    const categoryData = await Category.find().select('name').lean()
    expenseData.forEach(expense => {
        expense.categoryId = categoryData.find(category => expense.category === category.name)._id  
    })
    
    //新增使用者資料
    Promise.all(Array.from(userData, async (user) =>{
        const { name, email, password } = user
        const hashPassord = await bcrypt.genSalt(10).then(salt => bcrypt.hash( password, salt))
        const userId =  await User.create({ name, email, password: hashPassord }).then(item => item._id)
        expenseData.forEach( item => item.userId = userId)
        await Expense.create(expenseData)
    }))
    .then(()=>{
        console.log('recordSeeder created!')
        process.exit()
    })
})
