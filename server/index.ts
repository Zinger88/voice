import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import './core/db';

import { passport } from './core/passport';

const app = express();

app.use(passport.initialize());

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/login' }),
(req, res) => {
    res.json(req.user);
});

app.listen(3001, () => {
    console.log('Server runned')
})