'use strict'

import { DataTypes, Model, type Optional } from 'sequelize'
import connection from '../../config/connection'
import * as dotenv from 'dotenv'

dotenv.config()

interface IUsersAttributes {
    id?: number
    name?: string
    email?: string
    roleId?: number
    password?: string
    accessToken?: string
    verified?: boolean
    active?: boolean
    createAt?: Date
    updateAt?: Date
}

export interface IUsersInput extends Optional<IUsersAttributes, 'id'> { }
export interface IUsersOutput extends Required<IUsersAttributes> { }

class User extends Model<IUsersAttributes, IUsersInput> implements IUsersAttributes {
    public id!: number
    public name!: string
    public email!: string
    public roleId!: number
    public password!: string
    public accessToken!: string
    public verified!: boolean
    public active!: boolean
    public readonly createAt!: Date
    public readonly updatedAt!: Date
}

User.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    roleId: {
        allowNull: false,
        unique: true,
        type: DataTypes.BIGINT
    },
    password: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    accessToken: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    verified: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    active: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: true,
    sequelize: connection,
    underscored: false
})

export default User
