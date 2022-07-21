import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import dotenv from 'dotenv'
import categoryRouter from './routes/categoryRouter.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(categoryRouter)

app.listen(process.env.PORT, () => 
    console.log(chalk.bgBlue(`Server listening on port ${process.env.PORT}`))
)