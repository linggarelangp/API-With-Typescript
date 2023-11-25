import { type Request, type Response, type NextFunction } from 'express'
import response from '../utils/response'
import { extractToken } from '../utils/token'

export const authentication = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const authToken: string = req.headers.authorization as string

        const verifyToken: string | null = (authToken === undefined) ? null : authToken?.split(' ')[1]

        if (verifyToken === null) {
            return response(401, 'Unauthorized', 'Error Authorization', res)
        }

        const result: object | null = extractToken(verifyToken)

        if (result === null) {
            return response(401, 'Unauthorized', 'Data can\'t be Verified', res)
        }

        next()
    } catch (error: any) {
        return response(500, 'Internal Server Error', 'Unexpected', res)
    }
}
