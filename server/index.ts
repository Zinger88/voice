import dotenv from 'dotenv'
import express from 'express'

import './core/db'
import { passport } from './core/passport'

// prettier-ignore
dotenv.config() // IGNORE NOT WORKS !?

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
