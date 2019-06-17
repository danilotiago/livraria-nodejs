const uuid = require('uuid/v4')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UserDAO = require('../app/DAO/UserDAO')
const db = require('./database')

module.exports = (app) => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    }, (email, password, done) => {
        const userDAO = new UserDAO(db)

        userDAO.findByEmail(email)
            .then(user => {
                if (!user || password != user.senha) {
                    return done(null, false, {
                        message: 'E-mail ou senha incorretos'
                    })
                }

                return done(null, user)
            })
            .catch(error => done(error, false))
    }))

    passport.serializeUser((user, done) => {
        const userSession = {
            name: user.nome_completo,
            email: user.email
        }
        done(null, userSession)
    })

    passport.deserializeUser((userSession, done) => {
        done(null, userSession)
    })

    // seta a sessao
    app.use(session({
        secret: 'node livraria',
        resave: false,
        saveUninitialized: false,
        genid: function(req) {
            return uuid()
        }
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    // injecao do passport na requisicao pelo middleware
    app.use(function(req, resp, next) {
        req.passport = passport
        next()
    })
}