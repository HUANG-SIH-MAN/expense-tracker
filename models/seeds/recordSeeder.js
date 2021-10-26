const categoryData = require('./categoryData.json').results
const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', ()=>{
    Category.create(categoryData)
    // Promise.all(
        
    // )
    // .then(()=> {
    //     console.log('all done!')
    //     process.exit()
    // })
    // .catch(err => console.log(err))
})