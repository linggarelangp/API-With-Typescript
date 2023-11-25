import { type Response } from 'express'

const response = (statusCode: number, msg: string, datas: any, res: Response): Response => {
    const errors: any = datas
    if (errors !== null && errors instanceof Error) {
        return res.status(statusCode).json({
            status: statusCode,
            message: msg,
            data: errors
        })
    }

    return res.status(statusCode).json({
        status: statusCode,
        message: msg,
        data: datas
    })
}

export default response
