import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { response } from 'express';
import { TableCreateDto, TableUpdateDto } from 'src/dto/table.dto';
import { TableService } from './table.service';

@Controller('tables')
export class TableController {
    constructor(
        private readonly tableService: TableService
    ) { }

    @Get()
    async getAllTables(@Res() response) {
        try {
            const result = await this.tableService.getAllTables();
            response.json({
                result
            })
        } catch (error) {
            response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                message: error.message
            })
        }
    }

    @Post()
    async createTable(@Res() response, @Body() body: TableCreateDto) {
        try {
            const result = await this.tableService.createTable(body);
            if (result) return response.status(HttpStatus.CREATED).json({
                message: "Created success.",
                result: result
            })
        } catch (error) {
            response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                message: error.message
            })
        }
    }

    @Put(':id')
    async updateTable(
        @Res() response,
        @Body() body: TableUpdateDto,
        @Param('id') id: number
    ) {
        try {
            const result = await this.tableService.updateTable(body, id);
            if (result) response.status(HttpStatus.OK).json({
                message: 'success',
                result: result
            })
        } catch (error) {
            response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                message: error.message
            })
        }
    }

    @Delete(':id')
    async deleteTable(@Res() response, @Param('id') id: number) {
        try {
            const row = await this.tableService.deleteTable(id);
            if (row) return response.status(HttpStatus.OK).json({
                message: 'success',
                rowAttack: row
            })
        } catch (error) {
            response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
                message: error.message
            })
        }
    }

}
