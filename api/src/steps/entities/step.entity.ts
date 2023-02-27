import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Step {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stepNumber: number;

    @Column()
    description: string;
}
