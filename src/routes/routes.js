import { Router } from "express";
import compression from 'compression';
import { requireAuthentication, reqUserAutentication, increaseCounter, fetchUser } from "../controllers/session.js";
import { redirectDatos, loginFunction, failloginFunction, registerFunction, failregisterFunction, logoutFunction, datosFunction, getdataFunction, infoFunction } from './../controllers/controllers.js';
import { registerPassport, loginPassport } from "../controllers/passport.js";

const routes = Router();

// RUTAS

// --- GETS
routes.get('/', redirectDatos);
routes.get('/login', reqUserAutentication, loginFunction);
routes.get('/faillogin', failloginFunction);
routes.get('/register', reqUserAutentication, registerFunction);
routes.get('/failregister', failregisterFunction);
routes.get('/logout', logoutFunction);
routes.get('/datos', requireAuthentication, increaseCounter, datosFunction);
routes.get('/get-data', fetchUser, getdataFunction);
routes.get('/info', compression(), infoFunction);

// --- POSTS
routes.post('/login', loginPassport)
routes.post('/register', registerPassport)

// FIN DE RUTAS

export default routes;