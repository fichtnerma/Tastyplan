import { RecipesUploadImageService } from '../recipesUploadImage.service';
import * as sharp from 'sharp';
import { S3 } from 'aws-sdk';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('sharp', () =>
    jest.fn().mockImplementation(() => ({
        metadata: jest.fn().mockResolvedValue({
            width: 2000,
            height: 1000,
        }),
        extract: jest.fn().mockReturnThis(),
        resize: jest.fn().mockReturnThis(),
        jpeg: jest.fn().mockReturnThis(),
        toBuffer: jest.fn().mockResolvedValue(Buffer.from('test buffer')),
    })),
);

jest.mock('aws-sdk', () => {
    return {
        S3: jest.fn(() => ({
            // mock methods if needed
        })),
    };
});

describe('RecipesUploadImageService', () => {
    let service: RecipesUploadImageService;
    process.env.AWS_SECRET_ACCESS_KEY = 'test_secret_key';
    process.env.AWS_ACCESS_KEY_ID = 'test_access_key';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RecipesUploadImageService],
        }).compile();
        service = module.get<RecipesUploadImageService>(RecipesUploadImageService);
    });
    it('createS3Object => Should create a S3 Object', () => {
        service.createS3Object();
        expect(S3).toHaveBeenCalledWith({
            accessKeyId: 'test_access_key',
            secretAccessKey: 'test_secret_key',
            region: 'eu-central-1',
        });
    });
    it('createS3UploadParams => Should create a S3 upload params', () => {
        const exampleFileName = 'test.jpg';
        const examplBuffer = Buffer.from('test buffer');
        expect(service.createS3UploadParams(exampleFileName, examplBuffer)).toEqual({
            Bucket: 'tastyplan-images',
            Key: 'test.jpg',
            Body: examplBuffer,
            ContentType: 'image/jpg',
            ACL: 'public-read',
        });
    });
    it('resizeAndCropImage => Should return an input buffer with a propriate image size', async () => {
        const buffer = Buffer.from('test buffer');

        const result = await service.resizeAndCropImage(buffer);

        expect(sharp).toHaveBeenCalledWith(buffer);
        expect(result).toEqual(Buffer.from('test buffer'));
    });
});
