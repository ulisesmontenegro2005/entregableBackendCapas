import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUser, createUser, comparePassword, completeUserByUsername } from './../services/services.js'

passport.use('register', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const { email } = req.body;

    const user = await getUser(username);

    if (user) {
        return done(null, false, 'That user has already register')
    }

    const newUser = await createUser({username,password,email})

    done(null, newUser);
}))

passport.use('login', new LocalStrategy( async (username, password, done) => {
    let user = await completeUserByUsername(username)

    if (!user) {
        return done(null, false, 'This user not exist')
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return done(null, false, 'Incorrect password');

    done(null, user)
}))

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
    const user = await getUser(username)

    done(null, user)
})

const loginPassport = passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/datos' });

const registerPassport = passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'});

export {
    loginPassport,
    registerPassport
}