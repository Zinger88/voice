import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
    }
)

;(async () => {
    try {
        sequelize.authenticate()
        console.log('Connection has been')
    } catch (error) {
        console.error('Unable to connect', error)
    }
})()
