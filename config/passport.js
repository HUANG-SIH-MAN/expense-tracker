const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')
const User = require('../models/user')

module.exports = app => {
    //初始化
    app.use(passport.initialize())
    app.use(passport.session())

    //設定本地登入策略
    passport.use(new LocalStrategy({ usernameField: 'email' , passReqToCallback: true }
    ,(req, email, password, done) => {
        User.findOne({ email })
        .then(user => {
            if (!user) return done(null, false, { message: '此電子郵件並未被註冊!!' })
            return bcrypt.compare(password, user.password)
            .then(isMath => {
                if (!isMath) return done(null, false, { message: '密碼輸入錯誤，請重新輸入!!' })
                return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))

    //Facebook 登入
    passport.use(new FacebookStrategy({  
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done)  => {
        const { name, email } = profile._json
        User.findOne({email})
        .then(async (user) => {
            if (user) return done(null, user)
            const randomPassword = Math.random().toString(36).slice(-8)
            const hashPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(randomPassword, salt))
            await User.create({ name, email, password: hashPassword }).then(()=> done(null, user))
        })
        .catch(err => done(err, false))
    }))
                                          
    //序列化/反序列化
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
          .lean()
          .then(user => done(null, user))
          .catch(err => done(err, null))
    })
}