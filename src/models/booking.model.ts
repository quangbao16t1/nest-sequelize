import { format } from "path";
import { Table, Column, Model, HasMany, CreatedAt, AllowNull, UpdatedAt, IsEmail, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Tables } from "./tables.model";
import { User } from "./user.model";

@Table({ tableName: "bookings" })
export class Booking extends Model<Booking> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Tables)
    @Column
    tableId: number;

    @Column
    startTime: string;

    @Column
    endTime: string;

    @Column
    date: Date

    @Column
    status: string

    @Column
    name: string

    @Column
    phoneNumber: string

    @IsEmail
    @Column
    email: string

    @AllowNull(true)
    @CreatedAt
    @Column
    createdAt?: Date;

    @UpdatedAt
    @AllowNull(true)
    @Column({
        defaultValue: null
    })
    updatedAt?: Date

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Tables)
    table: Tables
}
