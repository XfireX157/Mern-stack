import express from 'express'
import routes from './Routes/index.js'
import cors from 'cors'
import db from './Database/db.js'
import dotenv from 'dotenv'
dotenv.config()

db()
const port = process.env.PORT || 8080
const app = express()
app.use(cors())

routes(app)

app.listen(port, () => console.log(`Rodando na porta ${port}`))