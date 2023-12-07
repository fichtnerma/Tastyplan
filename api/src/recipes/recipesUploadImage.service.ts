import * as sharp from 'sharp';
import * as path from 'path';
import { S3 } from 'aws-sdk';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class RecipesUploadImageService {
    async uploadImageToS3(file: Express.Multer.File) {
        // Create a new instance of S3
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        // Change the file extension to .png
        const fileName = path.parse(file.originalname).name + '.png';

        // Set up the parameters for the S3 upload
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: 'image/png',
            ACL: 'public-read', // Make the file publicly accessible
        };

        try {
            const data = await s3.upload(uploadParams).promise();
            return data.Location;
        } catch (error) {
            console.log('Error uploading file: ', error);
            throw new InternalServerErrorException('Error uploading file');
        }
    }

    async deleteImageFromS3(key: string) {
        const s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });

        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };

        try {
            await s3.deleteObject(deleteParams).promise();
            console.log(`File deleted successfully`);
        } catch (error) {
            console.log('Error deleting file: ', error);
            throw new InternalServerErrorException('Error deleting file');
        }
    }

    async resizeAndCropImage(file: Express.Multer.File): Promise<Buffer> {
        try {
            const image = sharp(file.buffer);
            const metadata = await image.metadata();
            const size = Math.min(metadata.width!, metadata.height!);
            const left = (metadata.width! - size) / 2;
            const top = (metadata.height! - size) / 2;

            const resizedImage = await image
                .extract({ left: Math.round(left), top: Math.round(top), width: size, height: size }) // crop image
                .resize(1024, 1024) // resize image
                .png() // convert to png
                .toBuffer(); // convert to buffer
            return resizedImage;
        } catch (error) {
            console.log('Error resizing image: ', error);
        }
    }
}
