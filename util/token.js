import jwt from 'jsonwebtoken'

export const createJWTToken = (claim) => {
    return jwt.sign(claim,process.env.JWT_SECRET,{expiresIn: '2h'})
}
export const verifyJWTToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}