import passport from 'passport'
import { Strategy } from 'passport-github'
import { where } from 'sequelize/types'

import { User } from '../../models'

const strategy = Strategy

passport.use(
    'github',
    new strategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
            callbackURL: 'http://localhost:3001/auth/github/callback',
        },
        async (_: unknown, __: unknown, profile: object, done) => {
            try {
                const obj = {
                    fullname: profile.displayName,
                    avatarUrl: profile.photos?.[0].value,
                    isActive: 0,
                    userName: profile.username,
                    phone: '',
                }

                const findUser = await User.findOne({
                    where: {
                        userName: obj.userName,
                    },
                })

                if (!findUser) {
                    const user = await User.create(obj)
                    done(null, user.toJSON())
                }
                done(null, findUser.toJSON())
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        err ? done(err) : done(null, user)
    })
})

export { passport }
