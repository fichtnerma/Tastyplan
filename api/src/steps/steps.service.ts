import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { Step } from './entities/step.entity';

@Injectable()
export class StepsService {
    /* constructor(
        @InjectRepository(Step)
        private stepRepository: Repository<Step>,
    ) {}

    create(createStepDto: CreateStepDto) {
        return 'This action adds a new step';
    }

    findAll() {
        return `This action returns all steps`;
    }

    async findOne(id: number) {
        const step = await this.stepRepository.findOneBy({ id: id });
        if (step) {
            return step;
        }
        return null;
    }

    update(id: number, updateStepDto: UpdateStepDto) {
        return `This action updates a #${id} step`;
    }

    remove(id: number) {
        return `This action removes a #${id} step`;
    } */
}
