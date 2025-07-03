import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dkqdwcguu',
  api_key: process.env.CLOUDINARY_API_KEY || '247353835574492',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'szyhZflWmLKMtwPbqFNhipKFEMQ',
});

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'users' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    });
  }
}
