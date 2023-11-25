import express, { type Express } from 'express'
import * as dotenv from 'dotenv'
import router from './routes/router'

/*
 * Create API using expressjs and nodejs
 *
 * Using Typescript for style languanges
 *
 * Creating Database with Sequelize and using MySQL
 *
 * the codes from Pujiyanto @https://www.youtube.com/@pujiyanto4346
*/

// npm run dev -> for development projects
// npm run start -> for production

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`app running at http://${process.env.HOST}:${process.env.PORT}`)
})
