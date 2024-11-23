import jwt from "jsonwebtoken"

const generateToken = (payload: object, secret: string, expiresIn: string) => {
    return jwt.sign(payload, secret, {expiresIn: expiresIn})
}

export default generateToken;