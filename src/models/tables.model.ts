import { AllowNull, Column, CreatedAt, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Booking } from "./booking.model";

@Table({ tableName: "tables" })
export class Tables extends Model<Tables> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    id: number;

    @Column
    code: string;

    @Column
    status: string;

    @Column
    capacity: number;

    @AllowNull(true)
    @CreatedAt
    @Column
    createdAt?: Date;

    @UpdatedAt
    @AllowNull(true)
    @Column({
        defaultValue: null
    })
    updatedAt?: Date;

    @HasMany(() => Booking)
    bookings: Booking[];

}