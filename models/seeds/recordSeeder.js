const bcrypt = require('bcryptjs')
const userData = require('./userData.json').results
const expenseData = require('./expenseData.json').results
const expense = require('../expense')
const Category = require('../category')
const User = require('../user')
const db = require('../../config/mongoose')

db.once('open',  ()=>{
    Promise.all(Array.from(userData, async (user) =>{
        const { name, email, password } = user
        const hashPassord = await bcrypt.genSalt(10).then(salt => bcrypt.hash( password, salt))
        const seedUserID = await User.create({ name, email, password: hashPassord }).then(user => user._id)
        return seedUserID
    }))
    .then(async (seedUserID) => {
        awati 
        console.log(seedUserID)
    })
    .then(()=>{
        console.log('recordSeeder created!')
        process.exit()
    })

})