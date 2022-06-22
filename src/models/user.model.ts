import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  IsEmail,
  Model,
  NotNull,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Role } from "./role.model";

@Table({ tableName: "users" })
export class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  age: number;

  @IsEmail
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  avatar: string;

  @Column
  address: string;

  @Column
  gender: string;

  @Column
  phoneNumber: string;

  @Column
  birthday: Date;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @AllowNull(true)
  @CreatedAt
  @Column
  createdAt?: Date;

  @UpdatedAt
  @AllowNull(true)
  @Column
  updatedAt?: Date;

  @BelongsTo(() => Role)
  role: Role;
}
