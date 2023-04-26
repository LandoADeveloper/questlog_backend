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
        res.status(500).end()
    }
    
}

export const login = async (req, res) => {
    try {
        console.log("test");
        const db = await getDb()
        console.log(req.body);
        const response = await db.collection(COL).findOne({email:req.body.email, password:req.body.password})
        console.log(response);
        if(response===null) return res.status(401).end()
        const token = createJWTToken({ user: response._id })
        //console.log(token);
        res.cookie('token', token,{ httpOnly: true, secure: true, sameSite: 'none' } ) //
        //console.log(res.cookie);
        res.send()
    }catch(err) {
        console.log(err.message);
        res.status(500).end()
    }
}

const emailExists = async(email) => {
    console.log(email);
    const db = await getDb()
    const result = await db.collection(COL).findOne({email: email})
    if(result === null) return false
    return true

}