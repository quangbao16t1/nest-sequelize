import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./config/database.module";
import { ConfigModule } from "@nestjs/config";
import { EmailModule } from './email/email.module';
import { UploadImgModule } from './modules/upload-img/upload-img.module';
import { UploadImgProvider } from './modules/upload-img/upload-img.provider';
import { TableModule } from "./modules/table/table.module";
import { BookingModule } from "./modules/booking/booking.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
    UploadImgModule,
    TableModule,
    BookingModule
  ],
  controllers: [AppController],
  providers: [AppService, ...UploadImgProvider],
})
export class AppModule { }
