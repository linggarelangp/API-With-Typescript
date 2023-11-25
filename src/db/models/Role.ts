import { DataTypes, Model, type Optional } from 'sequelize'
import connection from '../../config/connection'

interface IRoleAttibutes {
  id?: number
  rolename?: string | null
  active?: boolean | null
  createAt?: Date
  updateAt?: Date
}

export interface IRoleInput extends Optional<IRoleAttibutes, 'id'> { }
export interface IRoleOutput extends Required<IRoleAttibutes> { }

class Role extends Model<IRoleAttibutes, IRoleInput> implements IRoleAttibutes {
  public id!: number
  public rolename!: string
  public active!: boolean
  public readonly createAt!: Date
  public readonly updateAt!: Date
}

Role.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  rolename: {
    allowNull: true,
    type: DataTypes.STRING
  },
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
})

export default Role
