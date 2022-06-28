import { Inject, Injectable } from '@nestjs/common';
import { TableCreateDto, TableUpdateDto } from 'src/dto/table.dto';
import { Tables } from 'src/models/tables.model';

@Injectable()
export class TableService {
    constructor(
        @Inject("TABLE_REPOSITORY")
        private tableRepository: typeof Tables
    ) { }

    async getAllTables(): Promise<Tables[]> {
        return await this.tableRepository.findAll({});
    }

    async getTableById(id: number): Promise<Tables> {
        return await this.tableRepository.findOne({ where: { id: id } });
    }

    async createTable(tables: TableCreateDto): Promise<Tables> {
        return await this.tableRepository.create(tables);
    }

    async updateTable(table: TableUpdateDto, id): Promise<Tables> {
        const tableUpdate = await this.tableRepository.findOne({ where: { id: id } });
        if (!tableUpdate) throw new Error('not found');

        Object.assign(tableUpdate, table);

        return tableUpdate.save();
    }

    async deleteTable(id: number) {
        const deleteTable = await this.tableRepository.findOne({ where: { id: id } });
        if (!deleteTable) throw new Error('not found');

        return await this.tableRepository.destroy({ where: { id: id } });
    }
}
