const categoryData = require('./categoryData.json').results
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', async ()=>{
    await Category.create(categoryData)
    console.log('all done!')
    return process.exit()
})