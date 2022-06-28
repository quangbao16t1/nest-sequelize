import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { BookingController } from './booking.controller';
import { bookingProviders } from './booking.providers';
import { BookingService } from './booking.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, ...bookingProviders],
  imports: [DatabaseModule]

  
})
export class BookingModule {}
