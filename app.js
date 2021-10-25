const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routers')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
require('./config/mongoose')

app.use(routes)
app.listen(port ,()=>{
    console.log(`localhost:${port}`)
})