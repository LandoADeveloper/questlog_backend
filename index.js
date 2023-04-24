import './util/config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import  cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT


app.use(cors())
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())



app.listen(PORT, () => console.log('Ich lausche auf Port', PORT))
