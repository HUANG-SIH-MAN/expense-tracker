const categoryData = require('./categoryData.json').results
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', async ()=>{
    await Category.create(categoryData)
    console.log('categorySeeder created!')
    return process.exit()
})