import { Controller, HttpCode, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadImgService } from './upload-img.service';
import uploadCloud from 'src/config/cloudinary.config';

@Controller('upload')
export class UploadImgController {
    constructor(private readonly uploadImgService: UploadImgService) { }

    @Post('one')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File, @Res() response) {
        const result = await this.uploadImgService.uploadImageToCloudinary(file);
        response.status(HttpStatus.OK).json({
            img_url: result
        })
    }

    @Post('many')
    @UseInterceptors(AnyFilesInterceptor())
    async uploadManyImage(@UploadedFiles() files: Array<Express.Multer.File>, @Res() response) {
        try {
            const result = await this.uploadImgService.uploadManyToCloudinary(files);
            console.log(result)
            response.status(HttpStatus.OK).json({
                img_url: result
            })
        } catch (error) {
            response.status(HttpStatus.BAD_REQUEST).json({
                message: error.message
            })
        }
    }
}
