import './util/config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import  cookieParser from 'cookie-parser'
import { login, register } from './controller/userController.js'
import { encryptPassword, verifyJWTCookie} from './middleware/authMiddleware.js'


const app = express()
const PORT = process.env.PORT || 9999


app.use(cors(
    {
        origin: true,
        credentials: true
    }
))
app.use(morgan('combined'))
app.use(cookieParser())
app.use(express.json())

app.post('/api/v1/register', encryptPassword ,register)
app.post('/api/v1/login', encryptPassword,login)
app.get('/api/v1/logout', (_, res) => {
    res.clearCookie("token").end()
})
app.get('/api/v1/verify',verifyJWTCookie, (_,res) => {
    res.status(200).end()
})


app.listen(PORT, () => console.log('Ich lausche auf Port', PORT))
