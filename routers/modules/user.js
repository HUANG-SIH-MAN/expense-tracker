const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } =req.body
    //檢查密碼與確認密碼
    if (password !== confirmPassword) {
        const error = '密碼與確認密碼不相符!!'
        return res.render('register', { name, email, password, confirmPassword, error })
    }
    //檢查是否有註冊過
    const userExist = await User.findOne({ email })
    if (userExist) {
        const error = '此電子郵件已經註冊過了!!'
        return res.render('register', { name, email, password, confirmPassword, error }) 
    }
    //儲存註冊帳號資料
    const hashPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))  
    await User.create({ name, email, password: hashPassword })
    return res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', '登出成功!!')
    res.redirect('/users/login')
})

module.exports = router

