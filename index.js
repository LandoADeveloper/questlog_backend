import './util/config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import  cookieParser from 'cookie-parser'
import { register } from './controller/userController.js'
import { encryptPassword } from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 9999


app.use(cors())
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())

app.post('/api/v1/register', encryptPassword ,register)



app.listen(PORT, () => console.log('Ich lausche auf Port', PORT))
