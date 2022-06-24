import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./config/database.module";
import { ConfigModule } from "@nestjs/config";
import { EmailModule } from './email/email.module';
import { UploadImgModule } from './upload-img/upload-img.module';
import { UploadImgProvider } from './upload-img/upload-img.provider';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule, ConfigModule.forRoot({isGlobal: true}), EmailModule, UploadImgModule],
  controllers: [AppController],
  providers: [AppService, ...UploadImgProvider],
})
export class AppModule {}
