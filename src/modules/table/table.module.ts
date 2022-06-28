import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { TableController } from './table.controller';
import { tabelProviders } from './table.providers';
import { TableService } from './table.service';

@Module({
  imports: [DatabaseModule],
  providers: [TableService, ...tabelProviders],
  controllers: [TableController]
})
export class TableModule {}
