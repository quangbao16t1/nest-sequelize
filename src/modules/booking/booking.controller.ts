import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { getPagingData } from 'src/config/pagination';
import { Booking } from 'src/models/booking.model';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(
        private readonly bookingService: BookingService
    ) { }

    @Get()
    async getAllBookings(
        @Res() response,
        @Query('date') date: Date,
        @Query('page') page: number,
        @Query('size') size: number
    ) {
        try {
            const offset = 0 + (page - 1) * size
            const result = await this.bookingService.getAllBookings(date, Number(size), offset);
            const listBooking = await getPagingData(result, page, Number(size))
            response.status(HttpStatus.OK).json({
                result: listBooking
            })
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }

    @Post()
    async createBooking(@Res() response, @Body() body: Booking) {
        try {
            const result = await this.bookingService.createBooking(body);
            response.status(HttpStatus.CREATED).json({
                message: "created successfully",
                result: result
            })
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: error.message
            })
        }
    }
}
