import path from 'path';
import { infoObject } from './../services/services.js'

const redirectDatos = (req, res) => {
    res.redirect('/datos')
}

const loginFunction = (req, res) => {
    res.sendFile(path.resolve('public/pages/login.html'))
}

const failloginFunction = (req, res) => {
    res.render('login-error')
}

const registerFunction = (req, res) => {
    res.sendFile(path.resolve('public/pages/register.html'))
}

const failregisterFunction = (req, res) => {
    res.render('register-error')
}

const datosFunction = (req, res) => {
    res.sendFile(path.resolve('public/pages/datos.html'))
}

const logoutFunction = (req, res) => {
    req.session.destroy();
    res.redirect('/')
}

const getdataFunction = async (req, res) => {
    const { user } = req.body
    res.send({user, contador: req.session.contador})
}

const infoFunction = async (req, res) => {
    res.send(await infoObject())
}

export {
    redirectDatos,
    loginFunction,
    failloginFunction,
    registerFunction,
    failregisterFunction,
    datosFunction,
    logoutFunction,
    getdataFunction,
    infoFunction
};