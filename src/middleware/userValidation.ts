import { type Request, type Response, type NextFunction } from 'express'
import Validator, { type Rules } from 'validatorjs'
import User from '../db/models/Users'
import response from '../utils/response'

export const registerValidation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { ...data } = req.body

    const rules: Rules = {
        name: 'required|string|max:50',
        email: 'required|email',
        password: 'required|min:8',
        confirmPassword: 'required|same:password'
    }

    const validate: Validator.Validator<any> = new Validator(data, rules)

    if (validate.fails() ?? false) {
        return response(400, 'Bad Request', validate.errors, res)
    }

    const userEmailValidate: User | null = await User.findOne({ where: { email: data.email } })

    if (userEmailValidate !== null) {
        const errorMessage = {
            errors: {
                email: [
                    'Email already use'
                ]
            }
        }

        return response(400, 'Bad Request', errorMessage, res)
    }

    next()
}
