import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadImgService {

  async uploadImageToCloudinary(file: Express.Multer.File) {
    const result = await this.uploadImage(file);
    console.log(result);
    return result.secure_url;
  }

  async uploadManyToCloudinary(files: Array<Express.Multer.File>) {

    const result =  files.map(async (file) => {
      const newPath = await this.uploadImage(file);
     return newPath.secure_url
    })

    const urls = await Promise.all(result)
    return urls;
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      Readable.from(file.buffer).pipe(upload);
    });
  }
}