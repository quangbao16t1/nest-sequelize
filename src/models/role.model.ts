import { Table, Column, Model, HasMany, CreatedAt, AllowNull, UpdatedAt } from "sequelize-typescript";
import { User } from "./user.model";

@Table({ tableName: "roles" })
export class Role extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  id: number;

  @Column
  name: string;

  @AllowNull(true)
  @CreatedAt
  @Column
  createdAt?: Date;

  @UpdatedAt
  @AllowNull(true)
  @Column
  updatedAt?: Date;

  @HasMany(() => User)
  users: User[];
}
