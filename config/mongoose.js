const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', ()=>{    
    console.log('mongodb error !')
})

db.once('open', ()=>{
    console.log('mongodb connented !')
})

module.exports = db