import './core/db'
import dotenv from 'dotenv'
// prettier-ignore
dotenv.config()

import { passport } from './core/passport'
import express from 'express'


const app = express()

app.use(passport.initialize())

app.get('/auth/github', passport.authenticate('github'))

app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.send(
            `<script>window.opener.postMessage('${JSON.stringify(
                req.user
            )}', '*');window.close();</script>`
        )
    }
)

app.listen(3001, () => {
    console.log('Server runned')
})
