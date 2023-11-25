import jwt, { type JwtPayload } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

interface IDataUser {
    name: string
    email: string
    verified: boolean
    active: boolean
}

export const generateToken = (data: object): string => {
    const generate: string = jwt.sign(data, process.env.JWT_SECRET_KEY as string, { expiresIn: '20s' })

    return generate
}

export const generateRefreshToken = (data: object): string => {
    const generate: string = jwt.sign(data, process.env.JWT_REFRESH_TOKEN as string, { expiresIn: '1d' })

    return generate
}

export const extractToken = (token: string): object | null => {
    const secretKey: string = process.env.JWT_SECRET_KEY as string
    let data: JwtPayload | string | undefined

    jwt.verify(token, secretKey, (err, decode): void => {
        if (decode !== undefined && err === null) data = decode
        else data = undefined
    })

    if (data === undefined) return null
    return data as IDataUser
}

export const extractRefreshToken = (token: string): object | null => {
    const secretKey: string = process.env.JWT_REFRESH_TOKEN as string
    let data: JwtPayload | string | undefined

    jwt.verify(token, secretKey, (err, decode): void => {
        if (decode !== undefined && err === null) data = decode
        else data = undefined
    })

    if (data === null) return null
    return data as IDataUser
}
