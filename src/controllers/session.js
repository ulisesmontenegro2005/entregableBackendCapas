import { getUser } from './../services/services.js'

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

function reqUserAutentication (req, res, next) {
    if (req.user) {
        return res.redirect('/datos')
    } else{
        next()
    }
}

function increaseCounter (req, res, next) {
    if (!req.session.contador) {
        req.session.contador = 0
    }

    req.session.contador++

    next()
}

async function fetchUser (req, res, next) {
    if (!req.session.passport.user) {
        return res.redirect('/')
    }

    const user = await getUser(req.session.passport.user);

    req.body.user = user

    next()
}

export {
    requireAuthentication,
    reqUserAutentication,
    increaseCounter,
    fetchUser
};