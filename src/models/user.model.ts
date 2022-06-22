import { AllowNull, Column, IsEmail, Model, NotNull, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column({
        primaryKey: true
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
    gender: number;

    @Column
    phoneNumber: string;

    @Column
    birthday: Date;

    @Column
    roleId: number;

    @AllowNull(true)
    @Column
    createdAt?: Date;

    @AllowNull(true)
    @Column
    updatedAt?: Date;
}