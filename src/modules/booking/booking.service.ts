import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { Booking } from 'src/models/booking.model';
import { Tables } from 'src/models/tables.model';
import { User } from 'src/models/user.model';

@Injectable()
export class BookingService {
    constructor(
        @Inject("BOOKING_REPOSITOTY")
        private bookingRepository: typeof Booking
    ) { }

    async getAllBookings(date, limit: number, offset: number) {
        const Op = sequelize.Op;
        if (!date) return await this.bookingRepository.findAndCountAll({
            attributes: [
                'id',
                'userId', 'tableId', 'startTime', 'endTime',
                [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
                'status', 'name', 'phoneNumber', 'email',
                // [sequelize.fn('date_format', sequelize.col('createdAt'), '%Y-%m-%d'), 'createdAt'],
                // [sequelize.fn('date_format', sequelize.col('updatedAt'), '%Y-%m-%d'), 'updatedAt'],

            ],
            include: [{
                model: User, attributes: ['id', 'firstName', 'lastName', 'phoneNumber'],
            },
            {
                model: Tables
            }],
            limit: limit,
            offset: offset
        })
        return await this.bookingRepository.findAndCountAll({
            attributes: [
                'id',
                'userId', 'tableId', 'startTime', 'endTime',
                [sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), 'date'],
                'status', 'name', 'phoneNumber', 'email',
            ],
            where: {
                date: {
                    [Op.eq]: `${(date)}`
                }
            },
            include: [{
                model: User, attributes: ['id', 'firstName', 'lastName', 'phoneNumber'],
            },
            {
                model: Tables
            }],
            limit: limit,
            offset: offset
        });
    }

    async createBooking(booking: Booking): Promise<Booking> {
        return await this.bookingRepository.create(booking);
    }

    async getBookingById(id: number): Promise<Booking> {
        return await this.bookingRepository.findOne({ where: { id: id } });
    }

    async updateBooking(booking: Booking, id: number): Promise<Booking> {
        const bkUpdate = await this.bookingRepository.findOne({ where: { id: id } });
        if (!bkUpdate) throw new Error();
        Object.assign(bkUpdate, booking);

        return bkUpdate.save();
    }

    async deleteBooking(id) {
        const bkDelete = await this.bookingRepository.findOne({ where: { id: id } });
        if (!bkDelete) throw new Error();

        return await this.bookingRepository.destroy({ where: { id: id } });
    }
}
