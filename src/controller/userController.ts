import { type Request, type Response } from 'express'
import { generateToken, generateRefreshToken } from '../utils/token'
import { hashingPassword, comparePassword } from '../utils/hash'
import response from '../utils/response'
import User from '../db/models/Users'

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user: User[] = await User.findAll({ where: { active: true } })

        return response(200, 'OK', user, res)
    } catch (error: any) {
        if (error !== null && error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getUsersById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params

        const user: User | null = await User.findByPk(id)

        if (user === null) {
            return response(404, 'Not Found', null, res)
        }

        return response(200, 'OK', user, res)
    } catch (error: any) {
        if (error !== null && error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const userRegister = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { ...body } = req.body

        const hashed: string = await hashingPassword(body.password)

        const data: object = {
            name: body.name,
            email: body.email,
            roleId: body.roleId,
            password: hashed,
            accessToken: body.accessToken,
            verified: body.verified,
            active: body.active
        }

        const addingData: User = await User.create(data)

        return response(200, 'OK', addingData, res)
    } catch (error: any) {
        if (error !== null && error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', 'Data must be valid', res)
    }
}

export const userLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body

        const user: User | null = await User.findOne({ where: { email } })

        if (user === null) {
            return response(401, 'Unauthorized', null, res)
        }

        const matched: boolean = await comparePassword(password, user.password)

        if (!matched) {
            return response(401, 'Unauthorized', 'email or password wrong', res)
        }

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            verified: user.verified,
            active: user.active
        }

        const token: string = generateToken(userData)
        const refreshToken: string = generateRefreshToken(userData)

        res.cookie('token', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        })

        user.accessToken = refreshToken

        await user.save()

        const responseDataUser: object = {
            ...userData,
            verified: user.verified,
            active: user.active,
            token
        }

        return response(200, 'OK', responseDataUser, res)
    } catch (error: any) {
        if (error !== null && error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', 'Data must be valid', res)
    }
}

export const userLogout = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const user: any = await User.findByPk(id)
    await user.update({ accessToken: '' })

    res.clearCookie('token')

    return response(200, 'OK', 'Logout', res)
}
