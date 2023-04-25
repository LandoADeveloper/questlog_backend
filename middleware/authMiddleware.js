import {createHmac} from 'crypto'
import { verifyJWTToken } from '../util/token.js'

export const encryptPassword = (req, _, next) => {
    console.log("test encrypt password");
    const hmac = createHmac('sha256', req.body.password)
    req.body.password = hmac.digest('hex')
    next()
}

export const verifyJWTCookie = (req, res, next) => {
    const token = req.cookie.token
    try{
        const claim = verifyJWTToken(token)
        req.claim = claim
        console.log('claim: ' + req.claim);
        next()
    } catch(e){
        console.log(e.message);
        res.status(401).end()
    }
}