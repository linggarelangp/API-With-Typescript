import { type Dialect, Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()
const databaseHost: string = process.env.DB_HOST as string
const databaseUser: string = process.env.DB_USER as string
const databasePass: string = process.env.DB_PASS as string
const databaseName: string = process.env.DB_NAME as string
const databaseDiealect: Dialect = process.env.DIALECT as Dialect

const sequelizeConnection: Sequelize = new Sequelize(databaseName, databaseUser, databasePass, {
    host: databaseHost,
    dialect: databaseDiealect
})

export default sequelizeConnection
