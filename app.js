const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const category = require('./models/category')
const routes = require('./routers')
//const flash = require('connect-flash')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main'
    // ,helpers: {
    //     getCategoryIcon: function (categoryId) {
    //        return category.findById(categoryId)
    //        .lean()
    //        .then(item => item.icon)
    //     }
    // ,helpers: {
    //     getCategoryIcon: async function (categoryId) {
    //         const item = await category.findById(categoryId).lean()
    //        return item.icon
    //     }
    // }
}))

app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// app.use(flash())
// app.use((req, res, next) => {
//     res.locals.warning_msg = req.flash('warning_msg')
//     next()
// })
require('./config/mongoose')

app.use(routes)
app.listen(port ,()=>{
    console.log(`localhost:${port}`)
})