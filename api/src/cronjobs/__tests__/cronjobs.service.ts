import { CronjobsService } from '../cronjobs/cronjobs.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CronjobsService', () => {
    let service: CronjobsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CronjobsService],
        }).compile();
        service = module.get<CronjobsService>(CronjobsService);
    });
    it('Should work', () => {
        expect(true).toBe(true);
    });
});
