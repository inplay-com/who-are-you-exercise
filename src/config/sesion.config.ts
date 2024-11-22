import session from 'express-session';

export default session({
    secret: 'iplay-user-sesion-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // Session duration 1 day
    },
})

declare module 'express-session' {
    interface SessionData {
        userGueses?: string[];
    }
}
