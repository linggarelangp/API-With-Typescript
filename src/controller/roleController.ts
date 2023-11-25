import { type Request, type Response } from 'express'
import Role from '../db/models/Role'
import response from '../utils/response'

export const getRoles = async (req: Request, res: Response): Promise<Response> => {
    try {
        const role: Role[] = await Role.findAll({ where: { active: true } })

        return response(200, 'OK', role, res)
    } catch (error: any) {
        if (error !== null && error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const getRoleById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params

        const role: Role | null = await Role.findByPk(id)

        if (role === null) return response(404, 'Not Found', null, res)
        return response(200, 'OK', role, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const addRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { ...body } = req.body

        const role: Role = await Role.create(body)

        return response(201, 'Created', role, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const updateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const { rolename, active } = req.body

        const role: Role | null = await Role.findByPk(id)

        if (role === null) {
            return response(404, 'Not Found', null, res)
        }

        role.rolename = rolename
        role.active = active

        await role.save()

        return response(200, 'OK', role, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', null, res)
    }
}

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params

        const role: Role | null = await Role.findByPk(id)

        if (role === null) {
            return response(404, 'Not Found', null, res)
        }

        await role.destroy()

        return response(200, 'OK', role, res)
    } catch (error: any) {
        if (error instanceof Error) return response(500, 'Internal Server Error', error, res)
        return response(400, 'Bad Request', null, res)
    }
}
