import bcrypt from 'bcrypt'

export const hashingPassword = async (password: string): Promise<string> => {
    const hash: string = await bcrypt.hash(password, 10)

    return hash
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const result: boolean = await bcrypt.compare(password, hash)

    return result
}
