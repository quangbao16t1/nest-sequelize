import { Module } from '@nestjs/common';
import { UploadImgProvider } from './upload-img.provider';
import { UploadImgService } from './upload-img.service';
import { UploadImgController } from './upload-img.controller';

@Module({
  providers: [UploadImgService, ...UploadImgProvider],
  exports: [UploadImgService,... UploadImgProvider],
  controllers: [UploadImgController],
})
export class UploadImgModule {}
