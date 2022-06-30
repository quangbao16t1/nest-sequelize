import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { getPagingData } from 'src/config/pagination';
import { Booking } from 'src/models/booking.model';
import { BookingService } from './booking.service';
import { dateResult } from '../../constants/dataResult'

@Controller('bookings')
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

    @Get(':id')
    async getBkById(@Res() response, @Param('id') id: number) {
        try {
            const result = await this.bookingService.getBookingById(id);
            if (result) response.json(dateResult(200, result, "success", []));
        } catch (error) {
            response.json(dateResult(HttpStatus.BAD_REQUEST, [], "Not found", error.message))
        }
    }

    @Put(':id')
    async updateBooking(@Res() response, @Body() body, @Param('id') id) {
        try {
            const result = await this.bookingService.updateBooking(body, id);
            if (result) response.json(dateResult(HttpStatus.OK, result, "updated success", []));
        } catch (error) {
            response.json(dateResult(500, [], "Cant update!!", error.message));
        }
    }

    @Delete(':id')
    async deleteBooking(@Res() response, @Param('id') id) {
        try {
            const rowAttack = await this.bookingService.deleteBooking(id);
            if (rowAttack) response.json(dateResult(HttpStatus.OK, rowAttack, "deleted success", []))
        } catch (error) {
            response.json(dateResult(HttpStatus.INTERNAL_SERVER_ERROR, [], "Delete Failed", error.message))
        }
    }
}
