const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const category = require('./models/category')
const usePassport = require('./config/passport')
const routes = require('./routers')
const flash = require('connect-flash')
const session = require('express-session')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const app = express()
const port = process.env.PORT

app.engine('handlebars', exphbs({ defaultLayout: 'main'
    ,helpers: {
        equal: function (a, b) {
            //console.log(a, b)
            if (a === b) return 'selected'
        }
}}))

app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'user'
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.error_msg = req.flash('error')
    res.locals.success_msg = req.flash('success')
    next()
})

require('./config/mongoose')
app.use(routes)
app.listen(port ,()=>{
    console.log(`localhost:${port}`)
})