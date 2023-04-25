import {getDb } from '../util/db.js'
import { createJWTToken } from "../util/token.js"


const COL= 'user'

export const register = async (req,res) => {
    try {
        const db = await getDb()
        if(await emailExists(req.body.email)) return res.status(401).end()
        await db.collection(COL).insertOne(req.body)
        res.end()
    }catch(err) {
        console.log(err.message);
        res.status(501).end()
    }
    
}

export const login = async (req, res) => {
    try {
        const db = await getDb()
        const response = await db.collection(COL).findOne({email:req.body.email, password:req.body.password})
        if(response===null) return res.status(401).end()
        const token = createJWTToken({ user: response._id })
        console.log(token);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' })
        res.end()
    }catch(err) {
        console.log(err.message);
        res.status(501).end()
    }
}

const emailExists = async(email) => {
    console.log(email);
    const db = getDb()
    const result = await db.collection(COL.findOne({email: email}))
    if(result === null) return false
    return true

}